const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the home page (form)
app.get('/', (req, res) => {
    res.render('index', { totalIncome: null, error: null });
});

// Route to handle form submission
app.post('/calculate', (req, res) => {
    const { income1, income2 } = req.body;

    // Validate user input
    if (isNaN(income1) || isNaN(income2) || income1 === '' || income2 === '') {
        return res.render('index', { totalIncome: null, error: 'Please enter valid numbers for both income sources.' });
    }

    const totalIncome = parseFloat(income1) + parseFloat(income2);

    res.render('index', { totalIncome: totalIncome.toFixed(2), error: null });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});