import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const login = (username, password) => {
  const params = new URLSearchParams()
  params.append('grant_type', 'password')
  params.append('username', username)
  params.append('password', password)
  params.append('client_id', import.meta.env.VITE_CLIENT_ID)
  params.append('client_secret', import.meta.env.VITE_CLIENT_SECRET)

  return axios.post(`${API_URL}/o/token/`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}