import Card from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react'
import SearchList from './prospect_search_list'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';

function Search({ details }) {
  const [searchField, setSearchField] = useState("")

  const filteredProspect = details.filter(
    prospect => {
      return (
        prospect
          .name
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        prospect
          .mail
          .toLowerCase()
          .includes(searchField.toLowerCase())
      )
    }
  )

  const handleChange = e => {
    setSearchField(e.target.value)
  }

  function searchList() {
    return (
      <SearchList filteredProspect={filteredProspect} />   
    )
  }

  return (
    <>  
      <Card variant="outlined" sx={{m: 1}}>
        <TextField 
          sx={{m: 1}}
          id="input-search-prospect" 
          label="Search prospect" 
          variant="outlined" 
          onChange = {handleChange}
          placeholder = "Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}/>
      </Card>
      {searchList()}
    </>
  )
}

export default Search