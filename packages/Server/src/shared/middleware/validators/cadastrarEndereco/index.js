const validate = require('express-validation');
const Joi = require('joi');

const cadastrarEnderecoValidator = validate({
  body: {
    idUsuario: Joi.number().required(),
    rua: Joi.string().max(50).required(),
    numero: Joi.number().required(),
    cidade: Joi.string().max(50).required(),
    cep: Joi.string().max(9).required(),
    complemento: Joi.string().max(9).required(),
  },
});

module.exports = cadastrarEnderecoValidator;
