const Todo = require('../models/Todo');

// export const createTodo = async (req, res) => {};
exports.createTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    let { page, search } = req.query;

    if (!page) {
      page = 1;
    } else {
      page = +page;
    }

    const perPage = 2;

    const todos = await Todo.find(
      {
        $or: [
          {
            text: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            priority: 6,
          },
        ],
      },
      null,
      {
        limit: perPage,
        skip: (page - 1) * perPage,
      }
    );
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({
        message: `Not found id ${id}`,
      });
      return;
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({
        message: `Not found id ${id}`,
      });
      return;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({
        message: `Not found id ${id}`,
      });
      return;
    }

    const response = await Todo.findByIdAndDelete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateTodoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      next(new Error(`Not found id ${id}`));
      return;
    }

    todo.completed = req.body.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

exports.addTagsToSet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          tags: {
            $each: tags,
          },
        },
      },
      {
        new: true,
      }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

exports.pushTags = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $push: {
          tags: {
            $each: tags,
          },
        },
      },
      {
        new: true,
      }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

exports.popTags = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { order } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $pop: {
          tags: order,
        },
      },
      {
        new: true,
      }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

exports.pullAllTags = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $pullAll: {
          tags,
        },
      },
      {
        new: true,
      }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
