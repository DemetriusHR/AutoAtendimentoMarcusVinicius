const validate = require('express-validation');
const Joi = require('joi');

const confirmaDevolucaoPedidoValidator = validate({
  body: {
    idPedido: Joi.number().required(),
  },
});

module.exports = confirmaDevolucaoPedidoValidator;
