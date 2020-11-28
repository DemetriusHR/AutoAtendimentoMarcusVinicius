const validate = require('express-validation');
const Joi = require('joi');

const marcarHorarioValidator = validate({
  body: {
    data: Joi.date().required(),
    idUsuario: Joi.number().required(),
  },
});

module.exports = marcarHorarioValidator;
