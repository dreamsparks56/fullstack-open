import { Link } from 'react-router-dom'
import { useUserDispatch, useUserValue } from '../UserContext'

const NavBar = () => {
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'LOGOUT' })
  }

  return (
    <nav>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </nav>
  )
}

export default NavBar