import api from './api'

export const getAlbumes = () => api.get('albumes/')
export const getAlbum = (id) => api.get(`albumes/${id}/`)
export const createAlbum = (data) => api.post('albumes/', data)
export const updateAlbum = (id, data) => api.put(`albumes/${id}/`, data)
export const deleteAlbum = (id) => api.delete(`albumes/${id}/`)