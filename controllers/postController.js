const postService = require('../service/postService');

const getAll = async (req, res) => {
    const { user } = req.user;
    const allPosts = await postService.getAll(user);
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

module.exports = {
  create,
  getAll,
  getById,
  updatePost,
};