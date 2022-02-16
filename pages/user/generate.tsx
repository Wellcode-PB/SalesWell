import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function GenerateUser() {
  return <Box component="form" 
    sx={{
      '& .MuiTextField-root': { m: 1, width: '100%' },
      '& button': { m: 1 }
    }}
    autoComplete="off"
  >
    <div>
      <TextField id="email" label="email" />
    </div>
    <div>
    <TextField id="name" label="name" />
    </div>
    <div>
      <TextField id="password" label="Password" type="password" />
    </div>
    <div>
      <Button variant="contained">Generate</Button>
    </div>
  </Box>
}

export default GenerateUser
