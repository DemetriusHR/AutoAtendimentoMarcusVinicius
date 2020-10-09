const Joi = require("joi");

module.exports = {
  body: {
    endereco: Joi.string().required(),
    numero: Joi.number().required(),
    cidade: Joi.string().required(),
    estado: Joi.string().required(),
    quartos: Joi.number().required(),
    banheiros: Joi.number().required(),
    detahes: Joi.string().required(),
    tipoImovel: Joi.number().required(),
  },
};
