import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'

const User = ({ user }) => {
  if (!user) {
    return null
  }


  return (
    <Box sx={{ bgcolor:'background.paper' }}>
      <Typography variant="h2">{user.name}</Typography>
      <Typography variant="h3">added blogs</Typography>
      <List>
        {user.blogs.map(blog => <ListItem key={blog.id}>
          <ListItemText primary={blog.title} />
        </ListItem>)}
      </List>
    </Box>
  )
}

export default User