import React from 'react';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

function SearchProspect({ dataUpdateParams }) {
  function onSelectChange(event: SelectChangeEvent) {
    const searchInput = event.target.value as string;

    dataUpdateParams.setData([]);
    dataUpdateParams.setHasMore(true);

    if (searchInput === 'ENABLED' || 
        searchInput === 'DISABLED' || 
        searchInput === 'all') {
      dataUpdateParams.setfilter(searchInput);
    }
  }

  return (
    <>
      <Card sx={{ width: 'auto', height: 'auto', m: 2 }}>
        <CardContent>
          <FormControl sx={{ width: '15%', m: 1 }}>
            <InputLabel>Sort</InputLabel>
            <Select
              id="select-sort-by"
              label="Sort"
              onChange={onSelectChange}
              defaultValue="all"
            >
              <MenuItem value="all">All accounts</MenuItem>
              <MenuItem id="sort-by-enabled-stat" value="ENABLED">
                Enabled accounts
              </MenuItem>
              <MenuItem id="sort-by-disabled-stat" value="DISABLED">
                Disabled accounts
              </MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
}

export default SearchProspect;
