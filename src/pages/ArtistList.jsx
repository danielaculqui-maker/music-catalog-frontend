import { useState, useEffect } from 'react'
import { getArtistas } from '../services/artistaService'

function ArtistList() {
  const [artistas, setArtistas] = useState([])

  useEffect(() => {
    getArtistas()
      .then(response => setArtistas(response.data))
      .catch(error => console.error('Error al traer artistas:', error))
  }, [])

  return (
    <div>
      <h1>Listado de Artistas</h1>
      <ul>
        {artistas.map(artista => (
          <li key={artista.id}>{artista.nombre}</li>
        ))}
      </ul>
    </div>
  )
}

export default ArtistList
