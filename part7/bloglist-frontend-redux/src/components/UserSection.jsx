import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Heading, Table, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'

const UserSection = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const user= useSelector(state=> state.user)

  useEffect(()=> {
    dispatch(initializeUsers())
  }, [])

  return (
    <div>
      <Heading>Users</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader />
            <Table.ColumnHeader>blogs created</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {users.map(user =>
        <Table.Row key={user.id}>
          <Table.Cell>
          <Link to={ `/users/${user.id}` }>{user.name}</Link>
          </Table.Cell>
          <Table.Cell>
          {user.blogs.length}
          </Table.Cell>
        </Table.Row>
          )}
        </Table.Body>
      </Table.Root>      
    </div>
  )
}

export default UserSection