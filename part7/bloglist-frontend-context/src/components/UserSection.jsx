import { Link } from 'react-router-dom'
import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

const UserSection = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const users = result.data

  if(!users) {
    return null
  }


  return (
    <div>
      <Typography variant='h2'>Users</Typography>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
            blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user =>
            <TableRow key={user.id}>
              <TableCell><Link to={ `/users/${user.id}` }>{user.name}</Link></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableContainer>
    </div>
  )
}

export default UserSection