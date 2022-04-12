const { User } = require('../models');
const checkValidationsLogin = require('../schemas/validateJoiLogin');

function getError(status, message) {
  return { status, message };
}

const checkUser = async ({ email, password }) => {
  const { error } = checkValidationsLogin.validate({ email, password });
  if (error) throw getError(400, error.message);

  const checkUserLogin = await User.findOne({ where: { email } });
  if (!checkUserLogin) throw getError(400, 'Invalid fields');

  // const login = await User.findAll({ email, password });

  return checkUserLogin;
};

module.exports = {
  checkUser,
};
