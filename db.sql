CREATE SCHEMA ycbm_sync; -- Due to old booking system that was used
SET search_path = ycbm_sync, public;
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  name TEXT,
  phone TEXT,
  mail TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  fb TEXT,
  createdAt TIMESTAMP,
  startsAt TIMESTAMP,
  endsAt TIMESTAMP,
  tentative TEXT,
  cancelled TEXT,
  timezone TEXT,
  accountId TEXT,
  profileId TEXT
);
