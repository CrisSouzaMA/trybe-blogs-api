const postService = require('../service/postService');

const getAll = async (_req, res) => {
    const allPosts = await postService.getAll();
    return res.status(200).json(allPosts);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = await postService.getPostById(Number(id));
    return res.status(200).json(postId);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const post = await postService.updatePost(userId, Number(id), req.body);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({ message: error.message });
  }
};

 const create = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    // console.log(categoryIds);
    const userId = req.user.data.id;
    // console.log(userId);
    const newPost = await postService.createNewPost({ title, content, categoryIds, userId });
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({ message: error.message });
  }
};

const destroyPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.data.id;
    // console.log('userId', userId, typeof userId);
    await postService.destroyPost(Number(userId), Number(id));
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const post = await postService.searchPost(q);
  return res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  getById,
  updatePost,
  destroyPost,
  searchPost,
};