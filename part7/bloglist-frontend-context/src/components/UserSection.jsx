import { useEffect, useState } from 'react'
import userService from '../services/users'

const UserSection = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(acquiredUsers => {
        setUsers(acquiredUsers)
      })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserSection