// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Create uploads folder if not exists
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
});

// Upload route
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Use field name "resume".' });
    }

    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Invalid file type. Only PDF allowed.' });
    }

    // Check PDF signature
    const header = req.file.buffer.slice(0, 5).toString('utf8');
    if (!header.startsWith('%PDF-')) {
      return res.status(400).json({ error: 'File content mismatch: not a real PDF.' });
    }

    // Save file safely
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.pdf`;
    const savePath = path.join(UPLOAD_DIR, uniqueName);
    await fs.promises.writeFile(savePath, req.file.buffer);

    res.status(200).json({ message: 'Upload successful', filename: uniqueName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while saving the file.' });
  }
});

// Handle file too large
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Max allowed size is 2 MB.' });
  }
  next(err);
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
