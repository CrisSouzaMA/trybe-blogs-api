const { createNewCategory, getAll } = require('../service/categoryService');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategorie = await createNewCategory({ name });
    return res.status(201).json(newCategorie);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllCategories = async (_req, res) => {
  const getCat = await getAll();
  return res.status(200).json(getCat);
};

module.exports = {
  create,
  getAllCategories,
};