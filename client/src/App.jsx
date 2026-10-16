import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import * as todoService from './services/todoService'

function App() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('')

  // Sayfa ilk açıldığında görevleri getir
  useEffect(() => {
    const loadTodos = async () => {
      try {
        console.log("API URL:", import.meta.env.VITE_API_URL);
        const data = await todoService.getTodos()
        setTodos(data)
      } catch {
        setError('Görevler yüklenemedi.')
      }
    }
    loadTodos()
  }, [])

  const handleAdd = async (title) => {
    try {
      const newTodo = await todoService.createTodo(title)
      setTodos([newTodo, ...todos])
      setError('')
      return true
    } catch {
      setError('Görev eklenemedi.')
      return false
    }
  }

  const handleUpdate = async (id, title) => {
    try {
      const updated = await todoService.updateTodo(id, title)
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)))
      setError('')
      return true
    } catch {
      setError('Görev güncellenemedi.')
      return false
    }
  }

  const handleToggle = async (id) => {
    try {
      const updated = await todoService.toggleTodo(id)
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)))
      setError('')
    } catch {
      setError('Görev durumu değiştirilemedi.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id)
      setTodos(todos.filter((todo) => todo.id !== id))
      setError('')
    } catch {
      setError('Görev silinemedi.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>

        <TodoForm onAdd={handleAdd} />

        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {todos.length === 0 ? (
          <Typography color="text.secondary">Henüz görev yok.</Typography>
        ) : (
          <List>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </List>
        )}
      </Paper>
    </Container>
  )
}

export default App
