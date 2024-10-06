const Todo = require('../models/Todo');


exports.createTodo = async (req, res) => {
  const { task } = req.body;
  const userId = req.user.id;

  try {
    const newTodo = new Todo({ user: userId, task });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.getTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    todo.task = task || todo.task;
    todo.completed = completed !== undefined ? completed : todo.completed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    await todo.remove();
    res.json({ msg: 'Todo removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
