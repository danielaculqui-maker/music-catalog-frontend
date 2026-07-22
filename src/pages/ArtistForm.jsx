import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getArtista, createArtista, updateArtista } from '../services/artistaService'
import { TextField, Button, Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import './ArtistForm.css'
import ErrorAlert from '../components/ErrorAlert'

function ArtistForm() {
  const { id } = useParams()
  const esEdicion = Boolean(id)
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [biografia, setBiografia] = useState('')
  const [generoMusical, setGeneroMusical] = useState('')
  const [fechaFormacion, setFechaFormacion] = useState('')
  const [foto, setFoto] = useState(null)
  const [fotoActualUrl, setFotoActualUrl] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (esEdicion) {
      getArtista(id).then(response => {
        const data = response.data
        setNombre(data.nombre)
        setBiografia(data.biografia)
        setGeneroMusical(data.genero_musical)
        setFechaFormacion(data.fecha_formacion)
        setFotoActualUrl(data.foto)
      })
    }
  }, [id, esEdicion])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('biografia', biografia)
    formData.append('genero_musical', generoMusical)
    formData.append('fecha_formacion', fechaFormacion)
    if (foto) {
      formData.append('foto', foto)
    }

    try {
      if (esEdicion) {
        await updateArtista(id, formData)
      } else {
        await createArtista(formData)
      }
      navigate('/artistas')
    } catch (error) {
      console.error('Error al guardar artista:', error)
      setError('No se pudo guardar el artista. Verificá los datos e intentá de nuevo.')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="artist-form-container">
        <Typography variant="h4" className="form-title">
          {esEdicion ? 'Editar artista' : 'Nuevo artista'}
        </Typography>

        <ErrorAlert message={error} />

        <form onSubmit={handleSubmit} className="artist-form">
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <TextField
            label="Biografía"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          />
          <TextField
            label="Género musical"
            fullWidth
            margin="normal"
            value={generoMusical}
            onChange={(e) => setGeneroMusical(e.target.value)}
            required
          />
          <TextField
            label="Fecha de formación"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={fechaFormacion}
            onChange={(e) => setFechaFormacion(e.target.value)}
            required
          />

          {fotoActualUrl && !foto && (
            <div className="foto-preview">
              <Typography variant="caption" className="foto-preview-label">
                Foto actual:
              </Typography>
              <img src={fotoActualUrl} alt="Foto actual" />
            </div>
          )}

          <Button variant="outlined" component="label" className="btn-upload">
            {foto ? foto.name : (esEdicion ? 'Cambiar foto' : 'Subir foto')}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setFoto(e.target.files[0])}
            />
          </Button>

          <div className="form-actions">
            <Button variant="outlined" onClick={() => navigate('/artistas')}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" className="btn-primary">
              {esEdicion ? 'Guardar cambios' : 'Crear artista'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ArtistForm