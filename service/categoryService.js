const { Category } = require('../models');
const checkValidationsCategory = require('../schemas/validateJoiCategory');

function getError(status, message) {
  return { status, message };
}

const createNewCategory = async ({ name }) => {
  const { error } = checkValidationsCategory.validate({ name });
  if (error) throw getError(400, error.message);

  const createCategory = await Category.create({ name });

  return createCategory;
};

const getAll = async () => {
  const getAllCat = await Category.findAll();
  return getAllCat;
};

module.exports = {
  createNewCategory,
  getAll,
};
