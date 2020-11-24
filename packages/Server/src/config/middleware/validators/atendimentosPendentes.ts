import * as Joi from 'joi';

export default {
  dataInicial: Joi.date().required(),
  dataFinal: Joi.date().required(),
};
