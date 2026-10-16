import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Boş görev eklenmesine izin verme
    if (!title.trim()) return

    const success = await onAdd(title.trim())
    if (success) setTitle('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <TextField
        fullWidth
        size="small"
        label="Yeni görev"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Button type="submit" variant="contained" disabled={!title.trim()}>
        Ekle
      </Button>
    </Box>
  )
}

export default TodoForm
