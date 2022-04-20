const postService = require('../service/postService');

const getAll = async (req, res) => {
    const { user } = req.user;
    const allPosts = await postService.getAll(user);
    return res.status(200).json(allPosts);
};

 const create = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    // console.log(categoryIds);
    const userId = req.user;
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
};