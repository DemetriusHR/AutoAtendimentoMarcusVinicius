const response = require('../../../shared/middleware/response');
const enderecoRepository = require('../../repositories/endereco');

function cadastrarUsuarioService(req, res) {
  const { idUsuario, rua, numero, cidade, cep, complemento } = req.body;

  enderecoRepository
    .cadastrarEspecificoUsuario(idUsuario, rua, numero, cidade, cep, complemento)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function listarUsuarioService(req, res) {
  const idUsuario = parseInt(req.params.id);

  enderecoRepository
    .listarUsuario(idUsuario)
    .then((data) => {
      response.sucess(res, data);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function editarService(req, res) {
  const { id, rua, numero, cidade, uf, cep, complemento, idUsuario } = req.body;

  enderecoRepository
    .editar(id, rua, numero, cidade, uf, cep, complemento, idUsuario)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function excluirService(req, res) {
  const idEndereco = parseInt(req.params.id);

  enderecoRepository
    .excluir(idEndereco)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

module.exports = {
  cadastrarUsuario: cadastrarUsuarioService,
  listarUsuario: listarUsuarioService,
  editar: editarService,
  excluir: excluirService,
};
