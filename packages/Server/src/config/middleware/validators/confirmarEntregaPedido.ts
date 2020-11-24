import * as Joi from 'joi';

export default {
  body: {
    idPedido: Joi.number().required(),
  }
};
