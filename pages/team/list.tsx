import getMorePageData from '../../lib/get-more-page-data'
import InfiniteScroll from 'react-infinite-scroll-component'
import InfoCard from '../../components/InfoCard'
import { useEffect, useState } from 'react'

function TeamMembersList() {
  const [teamMembers, setTeamMembers] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const getMorePageDataParams = {
    data: teamMembers,
    setData: setTeamMembers,
    setHasMore: setHasMore,
    resultSource: "team_members"
  }

  useEffect(() => {
    getMorePageData(getMorePageDataParams)
  }, [])

  return (
    <>
      <InfiniteScroll
        dataLength={teamMembers.length}
        next={() => {getMorePageData(getMorePageDataParams)}}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {teamMembers.map((data) => (
          <InfoCard 
            key={data.mail} 
            userInfo={[data.id, data.name, data.mail, data.role]} 
            onClickRoute={null} 
            idPrefix={'member-'}
          />
        ))}
      </InfiniteScroll>
    </>
  )
}

export default TeamMembersList