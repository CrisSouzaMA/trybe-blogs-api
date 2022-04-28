const Joi = require('joi');

const checkValidationsPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
  userId: Joi.number().required(),
});

const checkUpdatePost = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
});

module.exports = {
  checkValidationsPost,
  checkUpdatePost,
};  