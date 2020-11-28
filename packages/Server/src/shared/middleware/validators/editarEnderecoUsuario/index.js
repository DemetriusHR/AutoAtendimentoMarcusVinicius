const validate = require('express-validation');
const Joi = require('joi');

const editarEnderecoUsuarioValidator = validate({
  body: {
    id: Joi.number().required(),
    rua: Joi.string().max(50).required(),
    numero: Joi.number().required(),
    cidade: Joi.string().max(50).required(),
    cep: Joi.string().max(9).required(),
    idUsuario: Joi.number().required(),
  },
});

module.exports = editarEnderecoUsuarioValidator;
