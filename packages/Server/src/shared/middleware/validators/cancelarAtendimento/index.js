const validate = require('express-validation');
const Joi = require('joi');

const cancelarAtendimentoValidator = validate({
  body: {
    idAtendimento: Joi.number().required(),
  },
});

module.exports = cancelarAtendimentoValidator;
