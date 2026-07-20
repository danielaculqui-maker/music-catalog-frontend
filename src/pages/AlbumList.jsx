import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAlbumes, deleteAlbum } from '../services/albumService'
import { getArtistas } from '../services/artistaService'
import { Button, Typography, Card, CardContent } from '@mui/material'
import Navbar from '../components/Navbar'
import './AlbumList.css'

function AlbumList() {
  const [albumes, setAlbumes] = useState([])
  const [artistas, setArtistas] = useState([])
  const navigate = useNavigate()

  const cargarDatos = () => {
    getAlbumes()
      .then(response => setAlbumes(response.data))
      .catch(error => console.error('Error al traer álbumes:', error))

    getArtistas()
      .then(response => setArtistas(response.data))
      .catch(error => console.error('Error al traer artistas:', error))
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que querés eliminar este álbum?')) {
      await deleteAlbum(id)
      cargarDatos()
    }
  }

  
  const albumesPorArtista = artistas.map(artista => ({
    artista,
    albumes: albumes.filter(album => album.artista === artista.id),
  })).filter(grupo => grupo.albumes.length > 0)

  return (
    <div>
      <Navbar />
      <div className="artist-list-container">
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

        {albumesPorArtista.map(({ artista, albumes }) => (
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
                      <Button size="small" className="btn-delete" onClick={() => handleDelete(album.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumList