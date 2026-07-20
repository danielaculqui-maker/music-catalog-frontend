import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArtistas, deleteArtista } from '../services/artistaService'
import { Button, Typography, Card, CardContent } from '@mui/material'
import Navbar from '../components/Navbar'
import './ArtistList.css'

function ArtistList() {
  const [artistas, setArtistas] = useState([])
  const navigate = useNavigate()

  const cargarArtistas = () => {
    getArtistas()
      .then(response => setArtistas(response.data))
      .catch(error => console.error('Error al traer artistas:', error))
  }

  useEffect(() => {
    cargarArtistas()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que querés eliminar este artista?')) {
      await deleteArtista(id)
      cargarArtistas()
    }
  }

  return (
    <div>
      <Navbar />
      <div className="artist-list-container">
        <div className="artist-list-header">
          <Typography variant="h4">Artistas</Typography>
          <Button
            variant="contained"
            className="btn-primary"
            onClick={() => navigate('/artistas/nuevo')}
          >
            + Nuevo artista
          </Button>
        </div>

        <div className="artist-grid">
          {artistas.map(artista => (
            <Card key={artista.id} className="artist-card">
              {artista.foto && (
                <img src={artista.foto} alt={artista.nombre} className="artist-photo" />
              )}
              <CardContent>
                <Typography variant="h6">{artista.nombre}</Typography>
                <Typography variant="body2" className="artist-genre">
                  {artista.genero_musical}
                </Typography>
                <Typography variant="body2" className="artist-albums">
                  {artista.albumes?.length || 0} álbum(es)
                </Typography>
              <div className="artist-actions">
                <Button size="small" onClick={() => navigate(`/artistas/${artista.id}`)}>
                Ver
                </Button>
                <Button size="small" onClick={() => navigate(`/artistas/editar/${artista.id}`)}>
                Editar
                </Button>
                <Button size="small" className="btn-delete" onClick={() => handleDelete(artista.id)}>
               Eliminar
              </Button>
</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistList