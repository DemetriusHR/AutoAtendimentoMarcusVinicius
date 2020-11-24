import * as Joi from 'joi';

export default {
  body: {
    idAtendimento: Joi.number().required(),
  }
};
