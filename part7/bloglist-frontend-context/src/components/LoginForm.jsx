import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { useMutation } from '@tanstack/react-query'
import { useUserDispatch } from '../UserContext'
import { useNotificationDispatch } from '../NotificationContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = useUserDispatch()
  const notify = useNotificationDispatch()

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      blogService.setToken(user.token)
      commentService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      login({ type: 'LOGIN', payload: user })
    },
    onError: (error) => {
      const msLength = 5000
      notify({ type: 'SET', payload: {
        message: error,
        success: false
      }
      })
      setTimeout(() => { notify({ type: 'RESET' }) }, msLength)
    }
  })

  const handleLogin = async ({ username, password }) => {
    loginMutation.mutate({ username, password })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    handleLogin({
      username,
      password,
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm
