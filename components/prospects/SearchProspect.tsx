import CreateProspect from './CreateProspect'
import { Alert, Divider, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

function SearchProspect({ setProspectsList }) {
  const [hasResults, setHasResults] = useState(null)

  function getSearchResults(event) {
    const searchInput = event.target.value

    fetch('/api/prospect/search?input=' + searchInput, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((response) => {
      // first, empty the list
      setProspectsList(() => [])

      if (response.error) {
        setHasResults({ message: response.error })
      } else {
        setHasResults(null)
        setProspectsList((data) => [...data, ...response])
      }
    })
  }

  return (
    <>
      <Paper sx={{ display: 'flex', margin: '2% 10% 2% 10%' }} >
        <IconButton><SearchIcon /></IconButton>
        <InputBase id="search-bar" sx={{ flex: 1 }}
            placeholder="Search Prospect" onChange={getSearchResults} />
        <Divider sx={{ height: 'auto', m: 0.5 }} orientation="vertical" />
        <CreateProspect />
      </Paper>
      { hasResults ?
        <Alert severity={'error'}>{hasResults.message}</Alert>
        : null }
    </>
  )
}

export default SearchProspect