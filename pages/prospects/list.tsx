import GetMorePageData from '../../components/get_more_page_data'
import Profile from '../../components/prospects/profile'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'

function ProspectList() {
  const [prospectsLength, setProspectsLength] = useState(0)
  const [prospects, setProspects] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const dataParams = {
    dataLength: prospectsLength,
    setDataLength: setProspectsLength,
    setData: setProspects,
    setHasMore: setHasMore,
    resultSource: "prospects"
  }

  useEffect(() => {
    GetMorePageData(dataParams)
  }, [])

  return (
    <>
      <InfiniteScroll
        dataLength={prospects.length}
        next={() => {GetMorePageData(dataParams)}}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {prospects.map((data) => (
          <Profile key={data.id} prospect={data}/>
        ))}
      </InfiniteScroll>
    </>
  )
}

export default ProspectList