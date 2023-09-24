import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function SuperSecretUserTableRow({ user }) {
  return (
    <TableRow>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.date_registered}</TableCell>
      <TableCell>{user.last_login}</TableCell>
    </TableRow>
  )
}

export default SuperSecretUserTableRow