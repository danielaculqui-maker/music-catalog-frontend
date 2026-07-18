import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Typography variant="h6" className="navbar-logo">Vinly</Typography>
      <Button onClick={handleLogout} className="navbar-logout">
        Cerrar sesión
      </Button>
    </nav>
  )
}

export default Navbar