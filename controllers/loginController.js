const { checkUser } = require('../service/loginService');
const { tokenCreate } = require('../middlewares/jwt');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkLoginUser = await checkUser({ email, password });
    const token = tokenCreate(checkLoginUser);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
};