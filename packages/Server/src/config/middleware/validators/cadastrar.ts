import * as Joi from 'joi';

export default {
  nome: Joi.string().max(100).required(),
  cpf: Joi.string().max(14).required(),
  tel: Joi.string().max(15).required(),
  senha: Joi.string().max(25).required(),
  enderecos: Joi.array()
    .items(
      Joi.object({
        rua_endereco_usuario: Joi.string().max(50),
        no_endereco_usuario: Joi.number(),
        cidade_endereco_usuario: Joi.string().max(50),
        cep_endereco_usuario: Joi.string().max(9),
        complemento_endereco_usuario: Joi.string().max(50),
      })
    )
    .required(),
};
