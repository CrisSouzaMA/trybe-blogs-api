const { createNewCategory } = require('../service/categoryService');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategorie = await createNewCategory({ name });
    return res.status(201).json(newCategorie);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
};