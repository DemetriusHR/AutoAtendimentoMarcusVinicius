const validate = require('express-validation');
const Joi = require('joi');

const adicionarEnderecoUsuarioValidator = validate({
  body: {
    rua: Joi.string().max(50).required(),
    numero: Joi.number().required(),
    cidade: Joi.string().max(50).required(),
    complemento: Joi.string().max(50),
    cep: Joi.string().max(9).required(),
    idUsuario: Joi.number().required(),
  },
});

module.exports = adicionarEnderecoUsuarioValidator;
