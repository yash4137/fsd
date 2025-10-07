const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Note = require('./models/Note');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes

// 📥 Create a new note
app.post('/api/notes', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const newNote = await Note.create({ title, content });
    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 📖 Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ timestamp: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 🔍 Get a single note by ID
app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✏️ Update a note
app.put('/api/notes/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, timestamp: Date.now() },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ❌ Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
