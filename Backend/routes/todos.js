const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/todo', auth, createTodo);
router.get('/todos', auth, getTodos);
router.put('/todo/:id', auth, updateTodo);
router.delete('/todo/:id', auth, deleteTodo);

module.exports = router;
