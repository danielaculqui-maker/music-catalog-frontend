import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getArtista } from '../services/artistaService'
import { Typography, Button, Card, CardContent } from '@mui/material'
import Navbar from '../components/Navbar'
import './ArtistDetail.css'

function ArtistDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [artista, setArtista] = useState(null)

  useEffect(() => {
    getArtista(id).then(response => setArtista(response.data))
  }, [id])

  if (!artista) return <div><Navbar /></div>

  return (
    <div>
      <Navbar />
      <div className="artist-detail-container">
        <Button onClick={() => navigate('/artistas')} className="back-button">
          ← Volver
        </Button>

        <div className="artist-detail-header">
          {artista.foto && (
            <img src={artista.foto} alt={artista.nombre} className="detail-photo" />
          )}
          <div>
            <Typography variant="h3">{artista.nombre}</Typography>
            <Typography variant="subtitle1" className="detail-genre">
              {artista.genero_musical}
            </Typography>
            <Typography variant="body2" className="detail-date">
              Formación: {artista.fecha_formacion}
            </Typography>
          </div>
        </div>

        <Typography variant="body1" className="detail-bio">
          {artista.biografia || 'Sin biografía disponible.'}
        </Typography>

        <Typography variant="h5" className="albums-title">
          Álbumes ({artista.albumes?.length || 0})
        </Typography>

        <div className="albums-grid">
          {artista.albumes?.map(album => (
            <Card key={album.id} className="album-card">
              <CardContent>
                <Typography variant="h6">{album.titulo}</Typography>
                <Typography variant="body2" className="album-info">
                  {album.fecha_lanzamiento} · {album.numero_canciones} canciones
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistDetail