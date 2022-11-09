import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import NavBar from './Navbar'

function Layout({ children }) {
  return <Box sx={{ flexGrow: 1 }}>
    <NavBar />
    <Container>
      {children}
    </Container>
  </Box>
}

export default Layout;