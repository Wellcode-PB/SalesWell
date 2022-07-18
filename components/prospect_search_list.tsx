import ProspectCard from './prospect_profile_card'
import React from 'react'

function SearchList({ filteredProspect }) {
  const filtered = filteredProspect.map(prospect =>  
    <ProspectCard key={prospect.id} prospect={prospect} />
  )
  return (
    <div>
      {filtered}
    </div>
  )
}

export default SearchList;