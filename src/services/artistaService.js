import api from './api'

export const getArtistas = () => api.get('artistas/')
export const getArtista = (id) => api.get(`artistas/${id}/`)
export const deleteArtista = (id) => api.delete(`artistas/${id}/`)

export const createArtista = (formData) => api.post('artistas/', formData)

export const updateArtista = (id, formData) => api.put(`artistas/${id}/`, formData)