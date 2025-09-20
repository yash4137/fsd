const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const homeRoute = require('./routes/home');

app.use('/', homeRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
