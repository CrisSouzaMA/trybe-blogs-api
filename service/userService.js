const { User } = require('../models');
const checkValidations = require('../schemas/validateJoiUser');

function getError(status, message) {
  return { status, message };
}

const createNewUser = async ({ displayName, email, password, image }) => {
  const { error } = checkValidations.validate({ displayName, email, password, image });
  if (error) throw getError(400, error.message);

  const checkEmail = await User.findOne({ where: { email } });
  if (checkEmail) throw getError(409, 'User already registered');

  const create = await User.create({ displayName, email, password, image });

  return create;
};

const getAll = async () => {
  const getAllUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return getAllUsers;
};

const getById = async (id) => {
  const getUserById = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!getUserById) throw getError(404, 'User does not exist');

  return getUserById;
};

const deleteUser = async (userId) => {
  await User.destroy({ where: { id: userId },
  });
};

module.exports = {
  createNewUser,
  getAll,
  getById,
  deleteUser,
};
