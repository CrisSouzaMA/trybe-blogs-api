const postService = require('../service/postService');

/* const getAll = async (_req, res) => {
  try {
    const allPosts = await postService.getAllPost();
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(401).json({ message: 'error' });
  }
}; */

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
 // getAll,
};