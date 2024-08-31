const express = require('express');
const cors = require('cors');
const database = require('./db.js');
const app = express();

// Express.json() is middleware that allows use of req.body from incoming requests
app.use(express.json());

// Cors allows different domains to access server
app.use(cors());

// ROUTES //

// Create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await database.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await database.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await database.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await database.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("You've deleted a todo...yay!");
  } catch (err) {
    console.error(err.message);
  }
})

// Get a single todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await database.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// listen method enables server to listen to requests
app.listen(5000, () => {
  console.log("Express server is running on port 5000...");
})