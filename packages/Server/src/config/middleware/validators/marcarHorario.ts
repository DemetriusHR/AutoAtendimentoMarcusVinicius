import * as Joi from 'joi';

export default {
  data: Joi.date().required(),
  idUsuario: Joi.number().required(),
};