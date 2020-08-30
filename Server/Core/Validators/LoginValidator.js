const Joi = require("joi");

module.exports = {
  body: {
    login: Joi.string().required(),
    senha: Joi.string().required(),
  },
};
