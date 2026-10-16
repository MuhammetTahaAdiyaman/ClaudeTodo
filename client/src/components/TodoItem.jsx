import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const handleSave = async () => {
    // Boş başlıkla kaydetmeye izin verme
    if (!editTitle.trim()) return

    const success = await onUpdate(todo.id, editTitle.trim())
    if (success) setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  // Düzenleme modu: başlık yerine input ve Kaydet/İptal butonları
  if (isEditing) {
    return (
      <ListItem divider sx={{ gap: 1, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
          sx={{ flex: 1, minWidth: 150 }}
          autoFocus
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" size="small" onClick={handleSave} disabled={!editTitle.trim()}>
            Kaydet
          </Button>
          <Button size="small" onClick={handleCancel}>
            İptal
          </Button>
        </Box>
      </ListItem>
    )
  }

  return (
    <ListItem divider>
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <Typography
        sx={{
          flex: 1,
          wordBreak: 'break-word',
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'text.secondary' : 'text.primary',
        }}
      >
        {todo.title}
      </Typography>
      <IconButton aria-label="Düzenle" onClick={() => setIsEditing(true)}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Sil" color="error" onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default TodoItem
