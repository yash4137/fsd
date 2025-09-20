const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Home route - shows calculator form
app.get("/", (req, res) => {
  res.send(`
    <h2>🧮 Kids Calculator</h2>
    <form action="/calculate" method="POST">
      <input type="text" name="num1" placeholder="Enter first number" required />
      <input type="text" name="num2" placeholder="Enter second number" required />
      <select name="operation">
        <option value="add">➕ Add</option>
        <option value="subtract">➖ Subtract</option>
        <option value="multiply">✖ Multiply</option>
        <option value="divide">➗ Divide</option>
      </select>
      <button type="submit">Calculate</button>
    </form>
  `);
});

// Calculation route
app.post("/calculate", (req, res) => {
  let { num1, num2, operation } = req.body;

  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send("<h3>❌ Please enter valid numbers only!</h3><a href='/'>Go Back</a>");
  }

  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        return res.send("<h3>⚠️ Cannot divide by zero!</h3><a href='/'>Go Back</a>");
      }
      result = num1 / num2;
      break;
    default:
      return res.send("<h3>❌ Invalid operation!</h3><a href='/'>Go Back</a>");
  }

  res.send(`
    <h2>✅ Result: ${result}</h2>
    <a href="/">Try Again</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Kids Calculator running at http://localhost:${PORT}`);
});
