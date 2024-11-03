import { Link } from 'react-router-dom'
import { useUserDispatch, useUserValue } from '../UserContext'
import { AppBar, Box, Button, Toolbar } from '@mui/material'

const NavBar = () => {
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'LOGOUT' })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
          blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
          users
          </Button>
        </Box>
        {user
          ? <div>
            <em>{user.name} logged in</em>
            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          </div>
          : <Button color="inherit" component={Link} to="/login">
              login
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavBar