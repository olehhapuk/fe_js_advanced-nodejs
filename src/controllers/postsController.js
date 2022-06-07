const { getAll, create, getById, update, deletePost } = require('../db/posts');
const commentsDb = require('../db/comments');

exports.create = (req, res) => {
  const { title } = req.body;

  const newPost = create(title);

  res.status(201).json(newPost);
};

exports.getAll = (req, res) => {
  const posts = getAll();
  res.json(posts);
};

exports.getById = (req, res) => {
  const { postId } = req.params;

  const post = getById(postId);
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

  const post = getById(postId);
  if (!post) {
    res.status(404).json({
      message: `Post with id ${postId} not found`,
    });
    return;
  }

  const { title } = req.body;

  const updatedPost = update(postId, {
    ...post,
    title,
  });

  res.json(updatedPost);
};

exports.deleteById = (req, res) => {
  const { postId } = req.params;

  const post = getById(postId);
  if (!post) {
    res.status(404).json({
      message: `Post with id ${postId} not found`,
    });
    return;
  }

  deletePost(postId);

  res.json({
    message: `Post with id ${postId} successfully deleted`,
  });
};

exports.like = (req, res) => {
  const { postId } = req.params;

  const post = getById(postId);
  if (!post) {
    res.status(404).json({
      message: `Post ${postId} not found`,
    });
    return;
  }

  const updatedPost = update(postId, {
    ...post,
    isLiked: !post.isLiked,
  });

  res.json(updatedPost);
};

exports.getLiked = (req, res) => {
  const likedPosts = getAll().filter((item) => item.isLiked === true);
  res.json(likedPosts);
};

exports.getComments = (req, res) => {
  const { postId } = req.params;

  const myComments = commentsDb
    .getAll()
    .filter((comment) => comment.parentPostId === postId);

  res.json(myComments);
};
