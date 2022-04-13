const Joi = require('joi');

const checkValidationsCategory = Joi.object({
name: Joi.string().required(),
});

module.exports = checkValidationsCategory;