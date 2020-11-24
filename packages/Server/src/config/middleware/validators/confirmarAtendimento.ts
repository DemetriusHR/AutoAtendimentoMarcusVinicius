import * as Joi from 'joi';

export default {
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
};
