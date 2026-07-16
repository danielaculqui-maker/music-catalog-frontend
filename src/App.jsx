import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ArtistList from './pages/ArtistList'
import ArtistForm from './pages/ArtistForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/artistas" element={<ArtistList />} />
        <Route path="/artistas/nuevo" element={<ArtistForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
