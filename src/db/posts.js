const { nanoid } = require('nanoid');

let posts = [];

function getAll() {
  return posts;
}

function create(title) {
  const newPost = {
    id: nanoid(),
    title: title,
    isLiked: false,
  };
  posts.push(newPost);

  return newPost;
}

function getById(postId) {
  const post = posts.find((postItem) => postItem.id === postId);
  return post;
}

function update(postId, data) {
  posts = posts.map((postItem) =>
    postItem.id === postId
      ? {
          ...data,
          id: postItem.id,
        }
      : postItem
  );
  const updatedPost = getById(postId);

  return updatedPost;
}

function deletePost(postId) {
  posts = posts.filter((postItem) => postItem.id !== postId);
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  deletePost,
};
