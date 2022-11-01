import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { 
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'

function BookingsFilter({dataUpdateParams, teamMembers}) {
  /**
   * dataUpdateParams contains:
   *  - setData -> needed to reset the data
   *  - setHasMore -> set it "true" when the data is reset
   *  - setOrderBy -> needed to update the data sort type
   *  - setSortOrder -> needed to update the data order (ascending or descending)
   *  - selectedTeamMembers -> necessary to know if the team member has been 
   *    selected and should be deselected or vice versa
   *  - setSelectedTeamMembers -> necessary to update the list with the selected 
   *    ones
   */

  const selectedTeamMembers = dataUpdateParams.selectedTeamMembers
  const setSelectedTeamMembers = dataUpdateParams.setSelectedTeamMembers
  const teamMembersNames = teamMembers.map(({ name }) => name)
  const isAllSelected = selectedTeamMembers.length === teamMembersNames.length

  function onSelectChange(event: SelectChangeEvent) {
    const newOrderParams:any = event.target.value

    //reset all data
    dataUpdateParams.setData([])
    dataUpdateParams.setHasMore(true)

    //if newOrderParams is an array then team members have been selected
    if (Array.isArray(newOrderParams)) {
      if (newOrderParams[newOrderParams.length - 1] === "all") {
        setSelectedTeamMembers(
          selectedTeamMembers.length === teamMembersNames.length ? [] 
          : teamMembersNames)
        return
      }
      setSelectedTeamMembers(newOrderParams)
    } else if (newOrderParams === 'asc' || newOrderParams === 'desc') {
      dataUpdateParams.setSortOrder(newOrderParams)
    } else {
      dataUpdateParams.setOrderBy(newOrderParams)
    }
  }

  return (
    <Card sx={{ width: 'auto', height: 'auto', m: 2 }} elevation={5}>
      <CardContent>
        <FormControl sx={{ width: '15%', m: 1 }} id="sort-by">
          <InputLabel>Sort by</InputLabel>
          <Select
            id="select-sort-by"
            label="Sort by Date"
            onChange={onSelectChange}
            defaultValue=""
          >
            <MenuItem id='sort-by-id' value='id'>ID</MenuItem>
            <MenuItem id='sort-by-date' value='startsat'>Date</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '15%', m: 1 }} id="ordering">
          <InputLabel>Ordering</InputLabel>
          <Select
            id="ordering"
            label="Ordering"
            onChange={onSelectChange}
            defaultValue=""
          >
            <MenuItem id='sort-asc' value='asc'>Ascending</MenuItem>
            <MenuItem id='sort-desc' value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '15%', m: 1 }} id="team-member-filter">
          <InputLabel>Team members</InputLabel>
          <Select
            id="sort-by-team-member"
            label="Sort by team member"
            multiple
            value={selectedTeamMembers}
            onChange={onSelectChange}
          >
            <MenuItem id="select-all" value="all">
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  selectedTeamMembers.length < teamMembersNames.length
                }
              />
              Select All
            </MenuItem>
            {teamMembers && teamMembers.map((teamMember) => (
              <MenuItem 
                id={teamMember.mail}
                key={teamMember.mail}
                value={teamMember.name}>
                  <Checkbox checked={
                    selectedTeamMembers.indexOf(teamMember.name) > -1
                  } />
                  {teamMember.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default BookingsFilter