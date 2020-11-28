const validate = require('express-validation');
const Joi = require('joi');

const confirmaEntregaPedidoValidator = validate({
  body: {
    idPedido: Joi.number().required(),
  },
});

module.exports = confirmaEntregaPedidoValidator;
