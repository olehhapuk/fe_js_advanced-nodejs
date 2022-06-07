const { nanoid } = require('nanoid');

let comments = [];

function getAll() {
  return comments;
}

function create({ username, text, parentPostId }) {
  const newComment = {
    id: nanoid(),
    username,
    text,
    parentPostId,
  };
  comments.push(newComment);

  return newComment;
}

function getById(commentId) {
  const comment = comments.find((commentItem) => commentItem.id === commentId);
  return comment;
}

function deleteComment(commentId) {
  comments = comments.filter((commentItem) => commentItem.id !== commentId);
}

module.exports = {
  getAll,
  create,
  getById,
  deleteComment,
};
