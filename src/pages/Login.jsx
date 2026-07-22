import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import { TextField, Button, Typography, Alert, Box } from '@mui/material'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  try {
    const response = await login(username, password)
    localStorage.setItem('access_token', response.data.access_token)
    localStorage.setItem('username', username)
    navigate('/artistas')
  } catch (err) {
    setError('Usuario o contraseña incorrectos')
  }
}
return (
  <div className="login-page">
    <Typography variant="h5" className="login-logo">Vinly</Typography>

    <Box className="login-container">
      <Typography variant="h5" className="login-title">Iniciar sesión</Typography>
      {error && <Alert severity="error" className="login-alert">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Usuario"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth className="login-button">
          Ingresar
        </Button>
      </form>
    </Box>
  </div>
)
}

export default Login