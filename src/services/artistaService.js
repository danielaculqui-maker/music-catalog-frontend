import api from './api'

export const getArtistas = () => api.get('artistas/')
export const getArtista = (id) => api.get(`artistas/${id}/`)
export const createArtista = (data) => api.post('artistas/', data)
export const updateArtista = (id, data) => api.put(`artistas/${id}/`, data)
export const deleteArtista = (id) => api.delete(`artistas/${id}/`)
