const Joi = require('joi');

module.exports = {
  body: {
    data: Joi.date().required(),
    idUsuario: Joi.number().required(),
  }
};
