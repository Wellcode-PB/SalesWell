import { Box, Chip, Divider, IconButton, InputBase, Paper } from '@mui/material'
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone'
import { useEffect, useState } from 'react'

function ProspectTags({ prospectId }) {
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/tag?prospect=${ prospectId }`)
    .then(response => response.json())
    .then(data => {
      setTags(data)
      setIsLoading(false)
    })
  }, [prospectId])
  
  async function addTag() {
    const tagIsAlreadyAdded = await checkTag()
    if (tagIsAlreadyAdded) {
      alert("Tag is already added.")
      setTag("")
      return
    } 
    const response = await fetch('/api/tag', {
      method: 'POST',
      body: JSON.stringify({ tag, prospectId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setTags([...tags, data])
    setTag("")
  }

  function checkTag() {
    let tagIsAlreadyAdded = false
    for (let i = 0; i < tags.length; i++) {
      if (tag == tags[i].name) {
        tagIsAlreadyAdded = true
        break
      }
    }
    return tagIsAlreadyAdded
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
      <Box sx={{ display: 'flex', width: '100%', margin: '5%' }}>
      <form onClick={(e) => e.stopPropagation()}>
        <Paper sx={{ display: 'flex', margin: '5%%', width: '100%' }} >
          <InputBase value={tag} onChange={(e) => setTag(e.target.value)} />
          <Divider sx={{ height: 'auto', m: 0.5 }} orientation="vertical" />
          <IconButton onClick={addTag}>
            <AddCircleOutlineTwoToneIcon />
          </IconButton>
        </Paper>
      </form>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {!isLoading ? 
          <div>{tags.map(tag => (
            <Chip sx={{ margin: '2%'}} label={tag.name} key={tag.id} size='medium'/>
          ))}
          </div> 
          : null}
      </Box>
    </Box>
  )
}

export default ProspectTags