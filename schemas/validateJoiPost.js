const Joi = require('joi');

const checkValidationsPost = Joi.object({
title: Joi.string().required(),
content: Joi.string().required(),
categoryIds: Joi.array().required(),
userId: Joi.number().required(),
});

module.exports = checkValidationsPost;