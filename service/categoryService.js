const { Categorie } = require('../models');
const checkValidationsCategory = require('../schemas/validateJoiCategory');

function getError(status, message) {
  return { status, message };
}

const createNewCategory = async ({ name }) => {
  const { error } = checkValidationsCategory.validate({ name });
  if (error) throw getError(400, error.message);

  const createCategory = await Categorie.create({ name });

  return createCategory;
};

module.exports = {
  createNewCategory,
};
