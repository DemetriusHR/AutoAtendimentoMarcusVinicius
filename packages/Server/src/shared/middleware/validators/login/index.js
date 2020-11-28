const validate = require('express-validation');
const Joi = require('joi');

const loginValidator = validate({
  body: {
    cpf: Joi.string().max(11),
    tel: Joi.string().max(11),
    senha: Joi.string().max(25).required(),
  },
});

module.exports = loginValidator;
