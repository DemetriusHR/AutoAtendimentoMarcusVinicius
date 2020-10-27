const Joi = require('joi');

module.exports = {
  body: {
    idAtendimento: Joi.number().required(),
  }
};
