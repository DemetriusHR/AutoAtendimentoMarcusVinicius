import * as Joi from 'joi';

export default {
  body: {
    data: Joi.date().required(),
  }
};
