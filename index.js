const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors()); 
app.use(express.json()); //req.body

//Routes

//create a todo
app.post("/todos", async(req, res) => {
    try{
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description] );

        res.json(newTodo.rows);

    } catch(err){
        console.log(err.message);
    }
});

//get all todos
app.get("/todos", async(req, res) => {
    try{
        const allTodo = await pool.query("SELECT * FROM todo");

        res.json(allTodo.rows);

    } catch(err){
        console.log(err.message);
    }
});

//get a todo
app.get("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows);

    } catch(err){
        console.log(err.message);
    }
});

//update a todo
app.put("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const { description } = req.body;
        const todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo has been updated...");

    } catch(err){
        console.log(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo has been deleted...");

    } catch(err){
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port no. 5000")
});