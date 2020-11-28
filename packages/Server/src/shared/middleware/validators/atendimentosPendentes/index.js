const validate = require('express-validation');
const Joi = require('joi');

const atendimentosPendentesValidator = validate({
  body: {
    dataInicial: Joi.date().required(),
    dataFinal: Joi.date().required(),
  },
});

module.exports = atendimentosPendentesValidator;
