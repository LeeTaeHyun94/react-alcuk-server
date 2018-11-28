var express = require('express');
const Todo = require('../schemas/todo');
var router = express.Router();

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
})

router.get('/api/todos', async (req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", '*');
    // res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    const nowdate = new Date();
    const todos = await Todo.find({deadline :{$gt : nowdate}}).sort({deadline:1,priority:-1});
    res.json(todos);
});

router.get('/api/todos/expired', async (req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", '*');
    // res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    const nowdate = new Date();
    const todos = await Todo.find({deadline :{$lt : nowdate}}).sort({deadline:1,priority:-1});
    res.json(todos);
});

router.get('/api/todo/:id', async (req, res) => {
    const todo = await Todo.find({_id: req.params.id});
    res.json(todo);
});

router.post('/api/todo', async (req, res) => {
    const todo = new Todo({
        title : req.body.title,
        description : req.body.description,
        deadline : req.body.deadline,
        priority : req.body.priority,
    });
    await todo.save()
        .then(function (result) {
            res.status(201).json(result);
        });
});

router.patch('/api/todo/:id', async (req, res, next) => {
    await Todo.findOneAndUpdate({_id: req.params.id}, {
        title : req.body.title,
        description : req.body.description,
        deadline : req.body.deadline,
        priority : req.body.priority,
    })
        .then((result) => {
            console.log(result);
            res.json(result);
        });
});

router.delete('/api/todo/:id', async (req, res, next) => {
    await Todo.findOneAndRemove({_id: req.params.id})
        .then((result) => {
            console.log(result);
            res.json(result);
        });
});

module.exports = router;
