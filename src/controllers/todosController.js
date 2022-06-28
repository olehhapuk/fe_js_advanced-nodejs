const Todo = require('../db/todos');

// export const createTodo = async (req, res) => {};
exports.createTodo = async (req, res) => {
  const newTodo = await Todo.createTodo(req.body);
  res.status(201).json(newTodo);
};

exports.getAllTodos = async (req, res) => {
  const todos = await Todo.getAllTodos();
  res.json(todos);
};

exports.getTodoById = async (req, res) => {};

exports.updateTodo = async (req, res) => {};

exports.deleteTodo = async (req, res) => {};

exports.updateTodoStatus = async (req, res) => {};
