import axios from 'axios'

const baseUrl = '/api/comments'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { createNew, setToken }