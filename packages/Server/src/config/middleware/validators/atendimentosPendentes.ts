import * as Joi from 'joi';

export default {
  body: {
    dataInicial: Joi.date().required(),
    dataFinal: Joi.date().required(),
  }
};
