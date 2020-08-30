const Joi = require("joi");

module.exports = {
  body: {
    nome: Joi.string().required(),
    login: Joi.string().required(),
    senha: Joi.string().required(),
    situacao: Joi.number().required(),
    id: Joi.number().required(),
  },
};
