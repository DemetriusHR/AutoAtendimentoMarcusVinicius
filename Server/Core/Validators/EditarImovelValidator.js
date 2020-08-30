const Joi = require("joi");

module.exports = {
  body: {
    endereco: Joi.string().required(),
    numero: Joi.number().required(),
    cidade: Joi.string().required(),
    estado: Joi.string().required(),
    banheiros: Joi.number().required(),
    detahes: Joi.string(),
    tipoImovel: Joi.number().required(),
    id: Joi.number().required(),
  },
};
