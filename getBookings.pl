use v5.30;

use Data::Dumper;
use DBIx::Simple;
use HTTP::Request;
use JSON;
use LWP::UserAgent;

sub send_request {
  my $url = shift;
  say $url;
  my $request = HTTP::Request->new(GET => $url);
  $request->header('Authorization' => "Bearer $ENV{CALENDLY_BEARER}");
  $request->header('Content-Type' => 'application/json');
  my $ua = LWP::UserAgent->new;
  $ua->agent('Mozilla/5.0');
  my $response = $ua->request($request);

  return $response->content;
}

my $db = DBIx::Simple->connect('dbi:Pg:');
sub save_event_in_db {
  my $event = shift;
  # say "Saving!";
  # say Dumper $event;

  my ($exists) = $db->query("SELECT 1 FROM ycbm_sync.bookings WHERE id=?", $event->{id})->list;

  return 0 if $exists;
  $db->insert('ycbm_sync.bookings', $event);
}

sub get_organization_id {
  my $response = decode_json(send_request('https://api.calendly.com/users/me'));
  return $response->{resource}->{current_organization};
}

sub get_event_details {
  my $link = shift;
  my %event;
  my $response = decode_json(send_request($link));
  return if $response->{resource}->{event_type} eq 'https://api.calendly.com/event_types/FEGN64Z5XYW3CYM2'; # mock interviews
  # say Dumper($response);

  $event{createdAt} = $response->{resource}->{created_at};
  $event{startsAt} = $response->{resource}->{start_time};
  $event{endsAt} = $response->{resource}->{end_time};
  $event{id} = $response->{resource}->{uri};

  $response = decode_json(send_request("$link/invitees"));

  $event{phone} = $response->{collection}[0]->{text_reminder_number};
  $event{mail} = $response->{collection}[0]->{email};
  $event{name} = $response->{collection}[0]->{name};

  $event{utm_campaign} = $response->{collection}[0]->{tracking}->{utm_campaign};
  $event{utm_source} = $response->{collection}[0]->{tracking}->{utm_source};
  $event{utm_medium} = $response->{collection}[0]->{tracking}->{utm_medium};
  # say Dumper($response);

  save_event_in_db(\%event);
  return %event;
}

my $MAX_PAGES = $ARGV[0] // 2000000;
sub get_all_events_by_link {
  --$MAX_PAGES;
  say "MAX_PAGES: $MAX_PAGES";
  my $link = shift;
  my $response = send_request($link);

  my $bookings = decode_json($response);

  my $next_page = $bookings->{pagination}->{next_page};
  say $next_page;

  my @bookings = @{$bookings->{collection}};

  for my $booking (@bookings) {
    get_event_details($booking->{uri});
  }
  get_all_events_by_link($next_page) if $next_page && $MAX_PAGES;
}

sub get_events_by_organization {
  my $org_id = shift;

  get_all_events_by_link("https://api.calendly.com/scheduled_events?organization=$org_id&sort=start_time:desc&rows=100");
}

my $organization_id = get_organization_id();

get_events_by_organization($organization_id);