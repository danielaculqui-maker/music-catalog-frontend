import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAlbumes, deleteAlbum } from '../services/albumService'
import { getArtistas } from '../services/artistaService'
import { Button, Typography, Card, CardContent, CircularProgress, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Navbar from '../components/Navbar'
import ConfirmDialog from '../components/ConfirmDialog'
import ErrorAlert from '../components/ErrorAlert'
import './AlbumList.css'

function AlbumList() {
  const [albumes, setAlbumes] = useState([])
  const [artistas, setArtistas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [albumAEliminar, setAlbumAEliminar] = useState(null)
  const navigate = useNavigate()

  const cargarDatos = () => {
    setCargando(true)
    setError('')
    Promise.all([getAlbumes(), getArtistas()])
      .then(([resAlbumes, resArtistas]) => {
        setAlbumes(resAlbumes.data)
        setArtistas(resArtistas.data)
      })
      .catch(error => {
        console.error('Error al traer datos:', error)
        setError('No se pudieron cargar los álbumes. Verificá tu conexión o intentá de nuevo.')
      })
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const abrirConfirmacion = (id) => {
    setAlbumAEliminar(id)
    setDialogoAbierto(true)
  }

  const confirmarEliminar = async () => {
    try {
      await deleteAlbum(albumAEliminar)
      setDialogoAbierto(false)
      cargarDatos()
    } catch (error) {
      console.error('Error al eliminar:', error)
      setError('No se pudo eliminar el álbum. Intentá de nuevo.')
      setDialogoAbierto(false)
    }
  }

  const texto = busqueda.toLowerCase()

  const albumesPorArtista = artistas
    .map(artista => ({
      artista,
      albumes: albumes.filter(album =>
        album.artista === artista.id &&
        (album.titulo.toLowerCase().includes(texto) ||
         artista.nombre.toLowerCase().includes(texto))
      ),
    }))
    .filter(grupo => grupo.albumes.length > 0)

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
        <ErrorAlert message={error} />

        <TextField
          placeholder="Buscar álbum o artista..."
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--color-text-secondary)' }} />
              </InputAdornment>
            ),
          }}
        />

        <div className="artist-list-header">
          <Typography variant="h4">Álbumes</Typography>
          <Button
            variant="contained"
            className="btn-primary"
            onClick={() => navigate('/albumes/nuevo')}
          >
            + Nuevo álbum
          </Button>
        </div>

        {albumesPorArtista.length === 0 ? (
          <Typography className="empty-state">
            {busqueda
              ? 'No se encontraron álbumes con ese criterio.'
              : 'Todavía no hay álbumes cargados. ¡Creá el primero!'}
          </Typography>
        ) : (
          albumesPorArtista.map(({ artista, albumes }) => (
            <div key={artista.id} className="album-group">
              <div className="album-group-header">
                {artista.foto && (
                  <img src={artista.foto} alt={artista.nombre} className="album-group-photo" />
                )}
                <Typography variant="h5">{artista.nombre}</Typography>
              </div>

              <div className="artist-grid">
                {albumes.map(album => (
                  <Card key={album.id} className="artist-card">
                    <CardContent>
                      <Typography variant="h6">{album.titulo}</Typography>
                      <Typography variant="body2" className="artist-albums">
                        {album.fecha_lanzamiento} · {album.numero_canciones} canciones
                      </Typography>
                      <div className="artist-actions">
                        <Button size="small" onClick={() => navigate(`/albumes/editar/${album.id}`)}>
                          Editar
                        </Button>
                        <Button size="small" className="btn-delete" onClick={() => abrirConfirmacion(album.id)}>
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={dialogoAbierto}
        title="Eliminar álbum"
        message="¿Seguro que querés eliminar este álbum? Esta acción no se puede deshacer."
        onConfirm={confirmarEliminar}
        onCancel={() => setDialogoAbierto(false)}
      />
    </div>
  )
}

export default AlbumList