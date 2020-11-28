const validate = require('express-validation');
const Joi = require('joi');

const cadastrarValidator = validate({
  body: {
    nome: Joi.string().min(5).max(100).required(),
    cpf: Joi.string().min(14).max(14).required(),
    tel: Joi.string().min(14).max(14).required(),
    senha: Joi.string().min(8).max(25).required(),
    enderecos: Joi.array()
      .items(
        Joi.object({
          rua_endereco_usuario: Joi.string().max(50),
          no_endereco_usuario: Joi.number(),
          cidade_endereco_usuario: Joi.string().max(50),
          cep_endereco_usuario: Joi.string().max(9),
          complemento_endereco_usuario: Joi.string().max(9),
        })
      )
      .required(),
  },
});

module.exports = cadastrarValidator;
