import express from 'express'
import helloRouter from "./Hello.js";

const lab5Router = express.Router();

const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};

const module = {
    id: 1, name: "Node Module", description: "This is Node Module", course: "CS 4550",
}

lab5Router.get('/welcome', (req, res) => {
    res.send("Welcome to Assignment 5");
})

lab5Router.get('/add/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
})

lab5Router.get('/subtract/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
})

lab5Router.get('/multiply/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
})

lab5Router.get('/divide/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const divide = parseInt(a) / parseInt(b);
    res.send(divide.toString());
})

lab5Router.get('/calculator', (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    switch (operation) {
        case "add":
            result = parseInt(a) + parseInt(b);
            break;
        case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
        case "multiply":
            result = parseInt(a) * parseInt(b);
            break
        case "divide":
            result = parseInt(a) / parseInt(b);
            break
        default:
            result = "Invalid operation";
    }
    res.send(result.toString());
})

lab5Router.get('/assignment', (req, res) => {
    res.json(assignment);
})

lab5Router.get('/assignment/title', (req, res) => {
    res.json(assignment.title);
})

lab5Router.get("/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
});

lab5Router.get("/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = +newScore;
    res.json(assignment);
});

lab5Router.get("/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted === "true";
    res.json(assignment);
});

lab5Router.get("/module", (req, res) => {
    res.json(module);
})

lab5Router.get("/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
})

lab5Router.get("/module/name", (req, res) => {
    res.json(module.name);
})

const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
];

lab5Router.get('/todos', (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
        const completedBool = completed === "true";
        const completedTodos = todos.filter(
            (t) => t.completed === completedBool);
        res.json(completedTodos);
        return;
    }

    res.json(todos);
})

lab5Router.post("/todos", (req, res) => {
    const newTodo = {
        ...req.body,
        id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
});

lab5Router.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todos.splice(todos.indexOf(todo), 1);
    res.json(todos);
});

lab5Router.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
});

lab5Router.get("/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
});

lab5Router.get("/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed;
    res.json(todos);
});

lab5Router.get("/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
});

lab5Router.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
})

export default lab5Router;