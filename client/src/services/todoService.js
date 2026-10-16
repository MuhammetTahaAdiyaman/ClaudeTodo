import axios from 'axios'

// Bütün istekler bu adrese gönderilir
const api = axios.create({
  baseURL: 'http://localhost:5001/api/todos',
})

export const getTodos = async () => {
  const response = await api.get('/')
  return response.data
}

export const createTodo = async (title) => {
  const response = await api.post('/', { title })
  return response.data
}

export const updateTodo = async (id, title) => {
  const response = await api.put(`/${id}`, { title })
  return response.data
}

export const toggleTodo = async (id) => {
  const response = await api.patch(`/${id}/toggle`)
  return response.data
}

export const deleteTodo = async (id) => {
  const response = await api.delete(`/${id}`)
  return response.data
}
