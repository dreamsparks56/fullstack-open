import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
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