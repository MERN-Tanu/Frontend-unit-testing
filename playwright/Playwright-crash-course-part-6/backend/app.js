const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let todos = [{
    id: 47, value: 'Task 47'
}];

app.get('/todos', (req, res) => {
    res.send({ status: 'Success', todos });
})

app.post('/addTodo', (req, res) => {
    todos = [...todos, req.body];
    res.send({ status: 'Success', message: 'Task added!', todos })
})

app.delete('/deleteTodo/:id', (req, res) => {
    todos = todos.filter(todo => todo.id != req.params.id);
    res.send({ status: 'Success', message: 'Task deleted!', todos });
})

app.listen(3000, () => {
    console.log("Listening to port 3k");
})