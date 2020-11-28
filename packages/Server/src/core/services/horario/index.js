const response = require('../../../shared/middleware/response');

const horarioRepository = require('../../repositories/horario');

function verificarService(req, res) {
  const { data } = req.body;

  horarioRepository
    .marcar(data)
    .then((dataRetornada) => {
      response.sucess(res, !!dataRetornada);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function marcarService(req, res) {
  const { data, idUsuario } = req.body;

  horarioRepository
    .marcar(data, idUsuario)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

module.exports = {
  marcar: marcarService,
  verificar: verificarService,
};
