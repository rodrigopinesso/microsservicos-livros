const Book = require('../models/Book');

// POST /books
exports.createBook = async (req, res) => {
  try {
    const { titulo, autor } = req.body;
    const livro = await Book.create({ titulo, autor });
    res.status(201).json(livro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /books
exports.getAllBooks = async (req, res) => {
  const livros = await Book.find();
  res.json(livros);
};

// GET /books/:id
exports.getBookById = async (req, res) => {
  try {
    const livro = await Book.findById(req.params.id);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /books/:id
exports.updateBook = async (req, res) => {
  try {
    const livro = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /books/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['disponível', 'reservado'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }
    const livro = await Book.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};