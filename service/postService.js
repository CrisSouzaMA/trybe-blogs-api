const { BlogPost, Category, User } = require('../models');
const checkValidationsPost = require('../schemas/validateJoiPost');

function getError(status, message) {
  return { status, message };
}

const include = [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
];

const getAll = async () => {
  const getAllPost = await BlogPost.findAll({ include });
  return getAllPost;
};

const getPostById = async (id) => {
  try {
    const getPostId = await BlogPost.findOne({ where: { id },
      include });
      if (!getPostId) throw getError(404, 'Post does not exist');
      return getPostId;
  } catch (error) {
    throw getError(404, 'Post does not exist');
  }
};

const createNewPost = async ({ title, content, categoryIds, userId }) => {
  const { error } = checkValidationsPost.validate({ title, content, categoryIds, userId });
  if (error) throw getError(400, error.message); // checa se os parametros estao corretos

  await Promise.all( // checa categorias
    categoryIds.map(async (data) => { // tirar esse map 
      const result = await Category.findOne({ where: { id: data } });
      // console.log(result);
      if (!result) throw getError(400, '"categoryIds" not found');
      return result;
    }),
  );

  const newPost = await BlogPost.create({ title, content, userId });
  /* await Promise.all( // adiciona no PostCategorie
  categoryIds.map(async (data) => { // tirar esse map 
  await PostCategory.create({ 
      categoryId: data, 
      postId: newPost.dataValues.id });
  }), 
); */

  return newPost;
};

module.exports = {
  createNewPost,
  getAll,
  getPostById,
};