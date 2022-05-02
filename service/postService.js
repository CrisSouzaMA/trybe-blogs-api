const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');
const { checkValidationsPost, checkUpdatePost } = require('../schemas/validateJoiPost');
// const { checkUser } = require('../middlewares/jwt');

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

const updatePost = async (user, id, body) => {
  const { title, content } = body;
  const { error } = checkUpdatePost.validate({ title, content });
  if (error) throw getError(400, error.message);
  if (Object.keys(body).length > 2) throw getError(400, 'Categories cannot be edited');

  const getPost = await BlogPost.findByPk(id);
  
  if (user.data.id !== getPost.userId) throw getError(401, 'Unauthorized user');

  await BlogPost.update({
    title,
    content,
  }, {
    where: { id, userId: user.data.id },
  });
  const postAt = await BlogPost.findOne({
    where: { id, userId: user.data.id },
    include,
  });
  return postAt;
};

const createNewPost = async ({ title, content, categoryIds, userId }) => {
  console.log('userId', userId, typeof userId);
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

const destroyPost = async (user, id) => {
  // console.log('user', user, typeof user);
  const getPost = await BlogPost.findByPk(id);
  if (!getPost) throw getError(404, 'Post does not exist');
  if (user !== getPost.dataValues.userId) throw getError(401, 'Unauthorized user');

  await BlogPost.destroy({ 
    where: { userId: user, id },
  });
};

const searchPost = async (query) => {
  console.log('query', query, typeof query);
  if (!query) {
    const posts = await getAll();
    return posts;
  }

  const postList = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${query}%` } }, { content: { [Op.like]: `%${query}%` } }],
    },
    include,
  });

  return postList || [];
};

module.exports = {
  createNewPost,
  getAll,
  getPostById,
  updatePost,
  destroyPost,
  searchPost,
};