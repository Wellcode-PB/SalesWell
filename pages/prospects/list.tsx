import getMorePageData from '../../lib/get-more-page-data'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProspectCard from '../../components/prospects/ProspectCard'
import SearchProspect from '../../components/prospects/SearchProspect'
import { useEffect, useState } from 'react'

function ProspectList() {
  const [prospects, setProspects] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const getMorePageDataParams = {
    data: prospects,
    setData: setProspects,
    setHasMore: setHasMore,
    resultSource: "prospects"
  }

  useEffect(() => {
    getMorePageData(getMorePageDataParams)
  }, [])

  return (
    <>
      <SearchProspect setProspectsList={setProspects}/>
      <InfiniteScroll
        dataLength={prospects.length}
        next={() => {getMorePageData(getMorePageDataParams)}}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {prospects.map((data) => (
          <ProspectCard key={data.id} prospect={data} />
        ))}
      </InfiniteScroll>
    </>
  )
}

export default ProspectList