import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Typography variant="h6" className="navbar-logo" onClick={() => navigate('/artistas')}>
          Vinly
        </Typography>
        {username && (
          <Typography className="navbar-greeting">
            Hola, {username}
          </Typography>
        )}
      </div>

      <div className="navbar-links">
        <Button onClick={() => navigate('/artistas')} className="navbar-link">
          Artistas
        </Button>
        <Button onClick={() => navigate('/albumes')} className="navbar-link">
          Álbumes
        </Button>
      </div>

      <Button onClick={handleLogout} className="navbar-logout">
        Cerrar sesión
      </Button>
    </nav>
  )
}

export default Navbar