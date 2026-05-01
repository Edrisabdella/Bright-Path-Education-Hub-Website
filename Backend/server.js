// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// ---------- SQLite Database ----------
const db = new sqlite3.Database('./database.sqlite');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    role TEXT DEFAULT 'learner',
    selected_service TEXT,
    grade_level TEXT,
    verified BOOLEAN DEFAULT 0,
    verification_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    service_name TEXT,
    title TEXT,
    description TEXT,
    file_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Create admin user if not exists (password: admin123)
  db.get(`SELECT * FROM users WHERE email = 'admin@brightpath.com'`, (err, row) => {
    if (!row) {
      const hashed = bcrypt.hashSync('admin123', 10);
      db.run(`INSERT INTO users (name, email, password, role, verified) VALUES (?, ?, ?, ?, ?)`,
        ['Admin', 'admin@brightpath.com', hashed, 'admin', 1]);
    }
  });
});

// ---------- Email Transporter ----------
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
} else {
  // Fallback – logs to console (still works without real email)
  transporter = { sendMail: (mail, cb) => { console.log('📧 EMAIL WOULD BE SENT:\n', mail); cb(null, { messageId: 'fake' }); } };
}

function sendEmail(to, subject, text) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER || 'noreply@brightpath.com',
    to,
    subject,
    text
  });
}

// ---------- JWT Middleware ----------
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ---------- API Routes ----------

// Register – sends verification code
app.post('/api/register', async (req, res) => {
  const { name, email, selected_service, grade_level } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (user) return res.status(400).json({ error: 'Email already registered' });

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    db.run(`INSERT INTO users (name, email, selected_service, grade_level, verification_code) VALUES (?, ?, ?, ?, ?)`,
      [name, email, selected_service, grade_level || null, verificationCode], async function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        await sendEmail(email, 'Verify your Bright Path account', 
          `Hello ${name},\n\nYour verification code is: ${verificationCode}\n\nEnter this code on the platform to complete your registration.\n\nIf you did not request this, please ignore.`);
        
        res.json({ message: 'Registration pending. Check your email for verification code.', userId: this.lastID });
      });
  });
});

// Verify email code
app.post('/api/verify', (req, res) => {
  const { email, code } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? AND verification_code = ?`, [email, code], (err, user) => {
    if (!user) return res.status(400).json({ error: 'Invalid verification code' });
    db.run(`UPDATE users SET verified = 1, verification_code = NULL WHERE id = ?`, [user.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET || 'fallback_secret');
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, selected_service: user.selected_service, grade_level: user.grade_level } });
    });
  });
});

// Login – only verified users
app.post('/api/login', (req, res) => {
  const { email } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (!user) return res.status(401).json({ error: 'User not found. Please register first.' });
    if (!user.verified) return res.status(401).json({ error: 'Email not verified. Check your inbox for verification code.' });
    const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET || 'fallback_secret');
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, selected_service: user.selected_service, grade_level: user.grade_level } });
  });
});

// Submit assignment (only verified users)
app.post('/api/submit', verifyToken, (req, res) => {
  const { service_name, title, description, file_data } = req.body;
  db.run(`INSERT INTO submissions (user_id, service_name, title, description, file_data) VALUES (?, ?, ?, ?, ?)`,
    [req.user.id, service_name, title, description, file_data || null], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      sendEmail('nejat.mahammednur@aau.edu.et', 'New Submission', 
        `User: ${req.user.name}\nService: ${service_name}\nTitle: ${title}\nDescription: ${description}`);
      res.json({ message: 'Submission saved' });
    });
});

app.get('/api/my-submissions', verifyToken, (req, res) => {
  db.all(`SELECT * FROM submissions WHERE user_id = ? ORDER BY created_at DESC`, [req.user.id], (err, rows) => {
    res.json(rows || []);
  });
});

// Admin endpoints
app.get('/api/admin/users', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  db.all(`SELECT id, name, email, selected_service, grade_level, verified, created_at FROM users WHERE role != 'admin'`, (err, rows) => {
    res.json(rows || []);
  });
});

app.get('/api/admin/submissions', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  db.all(`SELECT s.*, u.name as user_name FROM submissions s JOIN users u ON s.user_id = u.id ORDER BY s.created_at DESC`, (err, rows) => {
    res.json(rows || []);
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));