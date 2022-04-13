const { createNewUser, getAll, getById } = require('../service/userService');
const { tokenCreate } = require('../middlewares/jwt');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await createNewUser({ displayName, email, password, image });
    const token = tokenCreate(newUser);
    return res.status(201).json(token);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllUsers = async (_req, res) => {
    const listUsers = await getAll();
    return res.status(200).json(listUsers);
  };

const getByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await getById(Number(id));
    return res.status(200).json(userId);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAllUsers,
  getByIdUser,
};