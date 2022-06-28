const express = require('express');

const {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  updateTodoStatus,
} = require('../controllers/todosController');

const router = express.Router();

router.post('/', createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id/status', updateTodoStatus);

module.exports = router;
