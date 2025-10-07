// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Setup EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'library_secret_key', // keep this secret in real apps
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 5 }, // session expires in 5 minutes
  })
);

// Home (Login Page)
app.get('/', (req, res) => {
  if (req.session.username) {
    return res.redirect('/profile');
  }
  res.render('login');
});

// Handle Login
app.post('/login', (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.render('login', { error: 'Please enter your name' });
  }

  // Store session data
  req.session.username = username;
  req.session.loginTime = new Date().toLocaleString();

  res.redirect('/profile');
});

// Profile Page
app.get('/profile', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/');
  }

  res.render('profile', {
    username: req.session.username,
    loginTime: req.session.loginTime,
  });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send('Error logging out');
    res.redirect('/');
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
