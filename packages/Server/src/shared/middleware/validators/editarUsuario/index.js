const validate = require('express-validation');
const Joi = require('joi');

const editarUsuarioValidator = validate({
  body: {
    id: Joi.number().required(),
    nome: Joi.string().max(100).required(),
    cpf: Joi.string().max(14).required(),
    tel: Joi.string().max(15).required(),
    senha: Joi.string().max(25).required(),
  },
});

module.exports = editarUsuarioValidator;
