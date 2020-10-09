const Joi = require("joi");

module.exports = {
  body: {
    nome: Joi.string().required(),
    status: Joi.string().required(),
  },
};
