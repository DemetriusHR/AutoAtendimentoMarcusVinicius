const response = require('../../../shared/middleware/response');
const produtoRepository = require('../../repositories/produto');

function listarService(_, res) {
  produtoRepository
    .listar()
    .then((dataRetornada) => {
      response.sucess(res, dataRetornada);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function listarEspecificoService(req, res) {
  const idUsuario = parseInt(req.params.id);

  produtoRepository
    .listarEspecifico(idUsuario)
    .then((dataRetornada) => {
      response.sucess(res, dataRetornada);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

module.exports = {
  listar: listarService,
  listarEspecifico: listarEspecificoService,
};
