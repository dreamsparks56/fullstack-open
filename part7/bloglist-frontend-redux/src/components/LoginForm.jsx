import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Button, Card, Heading, Input, VStack } from '@chakra-ui/react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async ({ username, password }) => {
      dispatch(login({
        username,
        password,
      }))
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
    <Card.Root variant="subtle" maxW="sm">
      <Card.Body>
    <VStack>
      <Heading>log in to application</Heading>
      <form onSubmit={handleSubmit}>
        <VStack>
          <Input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            placeholder='Username'
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
        <Button type="submit">login</Button>
        </VStack>
      </form>
    </VStack>
    </Card.Body>
    </Card.Root>
    </div>
  )
}
export default LoginForm
