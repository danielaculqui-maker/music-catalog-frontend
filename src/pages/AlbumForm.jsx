import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAlbum, createAlbum, updateAlbum } from '../services/albumService'
import { getArtistas } from '../services/artistaService'
import { TextField, Button, Typography, MenuItem } from '@mui/material'
import Navbar from '../components/Navbar'
import './ArtistForm.css'

function AlbumForm() {
  const { id } = useParams()
  const esEdicion = Boolean(id)
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState('')
  const [fechaLanzamiento, setFechaLanzamiento] = useState('')
  const [numeroCanciones, setNumeroCanciones] = useState('')
  const [artistaId, setArtistaId] = useState('')
  const [artistas, setArtistas] = useState([])

  useEffect(() => {
    getArtistas().then(response => setArtistas(response.data))

    if (esEdicion) {
      getAlbum(id).then(response => {
        const data = response.data
        setTitulo(data.titulo)
        setFechaLanzamiento(data.fecha_lanzamiento)
        setNumeroCanciones(data.numero_canciones)
        setArtistaId(data.artista)
      })
    }
  }, [id, esEdicion])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const albumData = {
      titulo,
      fecha_lanzamiento: fechaLanzamiento,
      numero_canciones: Number(numeroCanciones),
      artista: artistaId,
    }

    if (esEdicion) {
      await updateAlbum(id, albumData)
    } else {
      await createAlbum(albumData)
    }

    navigate('/albumes')
  }

  return (
    <div>
      <Navbar />
      <div className="artist-form-container">
        <Typography variant="h4" className="form-title">
          {esEdicion ? 'Editar álbum' : 'Nuevo álbum'}
        </Typography>

        <form onSubmit={handleSubmit} className="artist-form">
          <TextField
            select
            label="Artista"
            fullWidth
            margin="normal"
            value={artistaId}
            onChange={(e) => setArtistaId(e.target.value)}
            required
          >
            {artistas.map((artista) => (
              <MenuItem key={artista.id} value={artista.id}>
                {artista.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Título"
            fullWidth
            margin="normal"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <TextField
            label="Fecha de lanzamiento"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={fechaLanzamiento}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
            required
          />
          <TextField
            label="Número de canciones"
            type="number"
            fullWidth
            margin="normal"
            value={numeroCanciones}
            onChange={(e) => setNumeroCanciones(e.target.value)}
            required
          />

          <div className="form-actions">
            <Button variant="outlined" onClick={() => navigate('/albumes')}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" className="btn-primary">
              {esEdicion ? 'Guardar cambios' : 'Crear álbum'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AlbumForm