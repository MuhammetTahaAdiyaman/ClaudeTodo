const pool = require('../config/db');

// Yardımcı: id parametresinin geçerli bir pozitif sayı olup olmadığını kontrol eder
const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

// GET /api/todos - Bütün görevleri getir
const getTodos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// POST /api/todos - Yeni görev oluştur
const createTodo = async (req, res) => {
  const title = req.body.title?.trim();

  if (!title) {
    return res.status(400).json({ error: 'Görev başlığı boş olamaz' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *',
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// PUT /api/todos/:id - Görevin başlığını güncelle
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const title = req.body.title?.trim();

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Geçersiz görev ID' });
  }
  if (!title) {
    return res.status(400).json({ error: 'Görev başlığı boş olamaz' });
  }

  try {
    const result = await pool.query(
      'UPDATE todos SET title = $1 WHERE id = $2 RETURNING *',
      [title, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Görev bulunamadı' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// PATCH /api/todos/:id/toggle - Tamamlanma durumunu tersine çevir
const toggleTodo = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Geçersiz görev ID' });
  }

  try {
    const result = await pool.query(
      'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Görev bulunamadı' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// DELETE /api/todos/:id - Görevi sil
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Geçersiz görev ID' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Görev bulunamadı' });
    }
    res.status(200).json({ message: 'Görev silindi' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

module.exports = { getTodos, createTodo, updateTodo, toggleTodo, deleteTodo };
