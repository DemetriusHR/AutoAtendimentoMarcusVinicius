const Joi = require('joi');

module.exports = {
  body: {
    dataInicial: Joi.date().required(),
    dataFinal: Joi.date().required(),
  }
};
