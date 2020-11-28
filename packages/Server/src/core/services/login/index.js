const response = require('../../../shared/middleware/response');
const createAuth = require('../../../shared/createAuth');
const loginRepository = require('../../repositories/login');
const enderecoRepository = require('../../repositories/endereco');

function loginService(req, res) {
  const { cpf, tel, senha } = req.body;
  loginRepository
    .login(cpf, tel, senha)
    .then((loginVerify) => {
      if (loginVerify.idUsuario) {
        const token = createAuth(loginVerify);
        const data = {
          loginVerify,
          token,
        };

        response.sucess(res, data);
      } else {
        response.errorClient(res, 'Usuário não Existente! Reveja seu Login');
      }
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function cadastrarService(req, res) {
  const { nome, cpf, senha, tel, enderecos } = req.body;

  let idUsuario = 0;

  loginRepository
    .cadastrarUsuario(nome, cpf, senha, tel)
    .then((data) => {
      idUsuario = data.idUsuario;

      enderecoRepository
        .cadastrarUsuario(idUsuario, enderecos)
        .then((data) => {
          response.sucess(res, data);
        })
        .catch((e) => {
          response.errorServer(res, e);
        });
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

module.exports = {
  login: loginService,
  cadastrar: cadastrarService,
};
