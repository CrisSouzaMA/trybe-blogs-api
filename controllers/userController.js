const { createNewUser } = require('../service/userService');
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

module.exports = {
  create,
};