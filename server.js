const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: "myfirstdb.cvyqceqk61tj.eu-north-1.rds.amazonaws.com",
  user: "admin", // Your MySQL username
  password: "adminadmin", // Your MySQL password
  database: "todo_db",
  port:"3306,"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// API to get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to add a new task
app.post("/tasks", (req, res) => {
  const task = req.body.task;
  db.query("INSERT INTO todos (task) VALUES (?)", [task], (err, result) => {
    if (err) throw err;
    res.sendStatus(201);
  });
});

// API to delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.sendStatus(204);
  });
});

// API to update task completion status
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed;
  db.query("UPDATE todos SET completed = ? WHERE id = ?", [completed, id], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
