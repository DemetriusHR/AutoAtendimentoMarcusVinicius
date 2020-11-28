const response = require('../../../shared/middleware/response');
const usuarioRepository = require('../../repositories/usuario');

function listarInformacoesService(req, res) {
  const idUsuario = parseInt(req.params.id);

  usuarioRepository
    .listarInformacoes(idUsuario)
    .then((data) => {
      response.sucess(res, data);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function editarService(req, res) {
  const { id, nome, tel, cpf, senha } = req.body;

  usuarioRepository
    .editar(id, nome, cpf, tel, senha)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function excluirService(req, res) {
  const idUsuario = parseInt(req.params.id);

  usuarioRepository
    .excluir(idUsuario)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

module.exports = {
  listarInformacoes: listarInformacoesService,
  editar: editarService,
  excluir: excluirService,
};
