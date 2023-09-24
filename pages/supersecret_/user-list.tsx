import pool from "../../lib/db"
import SuperSecretUserTableRow from "../../components/supersecret_/user-table-row"

import { getToken } from "next-auth/jwt"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, 
    secret: process.env.JWT_SECRET})
  if (!token) { 
    return { redirect: { destination: '/api/auth/signin', permanent: false } } 
  }
  
  const users = await pool.query(
    `SELECT username, name, date_registered, last_login 
      FROM public.users ORDER BY date_registered DESC LIMIT 20`
  )
  return { props: { users: JSON.parse(JSON.stringify(users.rows)) } }
}

function SuperSecretUserList({ users }) {
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date Registered</TableCell>
              <TableCell>Last Login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <SuperSecretUserTableRow key={user.username} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SuperSecretUserList