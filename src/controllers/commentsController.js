const yup = require('yup');

const { create, deleteComment, getById } = require('../db/comments');

const createCommentSchema = yup.object().shape({
  username: yup.string().min(3).max(255).required(),
  text: yup.string().min(3).required(),
  parentPostId: yup.string().required(),
});

exports.create = async (req, res) => {
  try {
    await createCommentSchema.validate(req.body, {
      abortEarly: false,
    });

    const newComment = create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(422).json(error);
  }
};

exports.getById = (req, res) => {
  const commentId = req.params.id;
  const comment = getById(commentId);
  if (!comment) {
    res.status(404).json({
      message: `Comment ${commentId} not found`,
    });
    return;
  }

  res.json(comment);
};

exports.deleteById = (req, res) => {
  const commentId = req.params.id;
  const comment = getById(commentId);
  if (!comment) {
    res.status(404).json({
      message: `Comment ${commentId} not found`,
    });
    return;
  }

  deleteComment(commentId);

  res.json({
    message: `Comment ${commentId} deleted`,
  });
};
