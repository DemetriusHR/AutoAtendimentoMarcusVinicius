const validate = require('express-validation');
const Joi = require('joi');

const verificaAtendimentoValidator = validate({
  body: {
    data: Joi.date().required(),
  },
});

module.exports = verificaAtendimentoValidator;
