const validate = require('express-validation');
const Joi = require('joi');

const confirmarAtendimentoValidator = validate({
  body: {
    idAtendimento: Joi.number().required(),
    dataPedido: Joi.date().required(),
    dataDevolucao: Joi.date().required(),
    vlPedido: Joi.number().required(),
    produtos: Joi.array()
      .items(
        Joi.object({
          id: Joi.number(),
          idAtendimento: Joi.number(),
          idProduto: Joi.number(),
          descricao: Joi.string().max(200),
        })
      )
      .required(),
  },
});

module.exports = confirmarAtendimentoValidator;
