const Joi = require("joi");

module.exports = {
  body: {
    id: Joi.number().required(),
  },
};
