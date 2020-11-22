const Joi = require('joi');

module.exports = {
  body: {
    id: Joi.number().required(),
    rua: Joi.string().max(50).required(),
    numero: Joi.number().required(),
    cidade: Joi.string().max(50).required(),
    cep: Joi.string().max(9).required(),
    idUsuario: Joi.number().required(),
  },
};
