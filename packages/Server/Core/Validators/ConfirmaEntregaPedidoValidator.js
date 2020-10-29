const Joi = require('joi');

module.exports = {
  body: {
    idPedido: Joi.number().required(),
  }
};
