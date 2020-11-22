const Joi = require('joi');

module.exports = {
  body: {
    id: Joi.number().required(),
    nome: Joi.string().max(100).required(),
    cpf: Joi.string().max(14).required(),
    tel: Joi.string().max(15).required(),
    senha: Joi.string().max(25).required(),
  },
};
