import getMorePageData from '../../lib/get-more-page-data'
import InfiniteScroll from 'react-infinite-scroll-component'
import TeamMemberCard from '../../components/team-members/TeamMemberCard'
import { useEffect, useState } from 'react'
import SearchTeamMember from '../../components/team-members/SearchTeamMember'

function TeamMembersList() {
  const [teamMembers, setTeamMembers] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [filter, setfilter] = useState('default')

  const getMorePageDataParams = {
    data: teamMembers,
    setData: setTeamMembers,
    setHasMore: setHasMore,
    resultSource: "team_members",
    setfilter: setfilter,
    filter: filter,
  }

  useEffect(() => {
    getMorePageData(getMorePageDataParams)
  }, [filter])

  return (
    <>
      <SearchTeamMember dataUpdateParams={getMorePageDataParams}/>
      <InfiniteScroll
        dataLength={teamMembers.length}
        next={() => {getMorePageData(getMorePageDataParams)}}
        hasMore={hasMore}
        loader={<h3>Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {teamMembers.map((data) => (
          <TeamMemberCard key={data.mail} teamMember={data}/>
        ))}
      </InfiniteScroll>
    </>
  )
}

export default TeamMembersList