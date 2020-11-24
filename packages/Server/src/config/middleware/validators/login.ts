import * as Joi from 'joi';

export default {
  cpf: Joi.string().max(11),
  tel: Joi.string().max(11),
  senha: Joi.string().max(25).required(),
};
