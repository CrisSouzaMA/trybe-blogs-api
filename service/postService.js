const { BlogPost, Categorie, PostCategorie } = require('../models');
const checkValidationsPost = require('../schemas/validateJoiPost');

function getError(status, message) {
  return { status, message };
}

/* const getUser = async (user) => {
  const getUserId = await User.findOne({ where: { id: user },
    attributes: { exclude: ['password'] },
  });
    return getUserId;
}; */

const createNewPost = async ({ title, content, categoryIds, userId }) => {
  const { error } = checkValidationsPost.validate({ title, content, categoryIds, userId });
  if (error) throw getError(400, error.message); // checa se os parametros estao corretos

  /* const checkUserId = await getUser(userId);
  if (!checkUserId) throw getError(400, error.message); // checa usuário
  console.log(checkUserId); */

  await Promise.all( // checa categorias
    categoryIds.map(async (data) => { // tirar esse map 
      const result = await Categorie.findOne({ where: { id: data } });
      // console.log(result);
      if (!result) throw getError(400, '"categoryIds" not found');
      return result;
    }),
  );

  const newPost = await BlogPost.create({ title, content, userId });
  await Promise.all( // adiciona no PostCategorie
  categoryIds.map(async (data) => { // tirar esse map 
  await PostCategorie.create({ 
      categoryId: data, 
      postId: newPost.dataValues.id });
  }),
);

  return newPost;
};

module.exports = {
  createNewPost,
  // getAllPost,
};