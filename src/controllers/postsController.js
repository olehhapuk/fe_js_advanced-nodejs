const { nanoid } = require('nanoid');

// module.exports = {
//   create() {},
//   getAll() {}
// }

let posts = [];

exports.create = (req, res) => {
  const { title } = req.body;

  const newPost = {
    id: nanoid(),
    title: title,
  };
  posts.push(newPost);

  res.status(201).json(newPost);
};

exports.getAll = (req, res) => {
  res.json(posts);
};

exports.getById = (req, res) => {
  const { postId } = req.params;

  const post = posts.find((postItem) => postItem.id === postId);
  if (!post) {
    res.status(404).json({
      message: `Post with id ${postId} not found`,
    });
    return;
  }

  res.json(post);
};

exports.update = (req, res) => {
  const { postId } = req.params;

  const post = posts.find((postItem) => postItem.id === postId);
  if (!post) {
    res.status(404).json({
      message: `Post with id ${postId} not found`,
    });
    return;
  }

  const { title } = req.body;

  posts = posts.map((postItem) =>
    postItem.id === postId
      ? {
          id: postItem.id,
          title: title,
        }
      : postItem
  );
  const updatedPost = posts.find((postItem) => postItem.id === postId);

  res.json(updatedPost);
};

exports.deleteById = (req, res) => {
  const { postId } = req.params;

  const post = posts.find((postItem) => postItem.id === postId);
  if (!post) {
    res.status(404).json({
      message: `Post with id ${postId} not found`,
    });
    return;
  }

  posts = posts.filter((postItem) => postItem.id !== postId);

  res.json({
    message: `Post with id ${postId} successfully deleted`,
  });
};
