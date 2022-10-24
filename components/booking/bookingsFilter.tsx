import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'

function BookingFilter({dataUpdateParams}) {
  /**
   * dataUpdateParams contains:
   *  - setData -> needed to reset the data
   *  - setHasMore -> set it "true" when the data is reset
   *  - setOrderBy -> needed to update the data sort type
   *  - setSortOrder -> needed to update the data order (ascending or descending)
   */

  function onSelectChange(event: SelectChangeEvent) {
    const newOrderParams = event.target.value as string

    //reset all data
    dataUpdateParams.setData([])
    dataUpdateParams.setHasMore(true)

    if (newOrderParams === 'asc' || newOrderParams === 'desc') {
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
      </CardContent>
    </Card>
  )
}

export default BookingFilter