import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ArtistList from './pages/ArtistList'
import ArtistForm from './pages/ArtistForm'
import ArtistDetail from './pages/ArtistDetail'
import AlbumList from './pages/AlbumList'
import AlbumForm from './pages/AlbumForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/artistas" element={<ArtistList />} />
        <Route path="/artistas/nuevo" element={<ArtistForm />} />
        <Route path="/artistas/editar/:id" element={<ArtistForm />} />
        <Route path="/artistas/:id" element={<ArtistDetail />} />
        <Route path="/albumes" element={<AlbumList />} />
        <Route path="/albumes/nuevo" element={<AlbumForm />} />
        <Route path="/albumes/editar/:id" element={<AlbumForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App