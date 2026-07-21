import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArtistas, deleteArtista } from '../services/artistaService'
import { Button, Typography, Card, CardContent, CircularProgress } from '@mui/material'
import Navbar from '../components/Navbar'
import ConfirmDialog from '../components/ConfirmDialog'
import './ArtistList.css'

function ArtistList() {
  const [artistas, setArtistas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [artistaAEliminar, setArtistaAEliminar] = useState(null)
  const navigate = useNavigate()

  const cargarArtistas = () => {
    setCargando(true)
    getArtistas()
      .then(response => setArtistas(response.data))
      .catch(error => console.error('Error al traer artistas:', error))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarArtistas()
  }, [])

  const abrirConfirmacion = (id) => {
    setArtistaAEliminar(id)
    setDialogoAbierto(true)
  }

  const confirmarEliminar = async () => {
    await deleteArtista(artistaAEliminar)
    setDialogoAbierto(false)
    cargarArtistas()
  }

  if (cargando) {
    return (
      <div>
        <Navbar />
        <div className="loading-container">
          <CircularProgress sx={{ color: 'var(--color-primary)' }} />
        </div>
      </div>
    )
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

        {artistas.length === 0 ? (
          <Typography className="empty-state">
            Todavía no hay artistas cargados. ¡Creá el primero!
          </Typography>
        ) : (
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
                    <Button size="small" className="btn-delete" onClick={() => abrirConfirmacion(artista.id)}>
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={dialogoAbierto}
        title="Eliminar artista"
        message="¿Seguro que querés eliminar este artista? Esta acción no se puede deshacer."
        onConfirm={confirmarEliminar}
        onCancel={() => setDialogoAbierto(false)}
      />
    </div>
  )
}

export default ArtistList
