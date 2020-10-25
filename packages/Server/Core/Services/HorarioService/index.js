const log = require('../../../Logs');
const {
  verificaHorarioRepository,
  marcarHorarioRepository,
} = require('../../Repositories/HorarioRepository');

function verificaHorarioService(req, res) {
  const { data } = req.body;

  verificaHorarioRepository(data)
    .then((dataRetornada) => {
      res.json({
        status: 200,
        message: 'ok',
        data: !!dataRetornada,
      });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    });
}

function marcarHorarioService(req, res) {
  const { data, idUsuario } = req.body;

  marcarHorarioRepository(data, idUsuario)
    .then(() => {
      res.json({
        status: 200,
        message: 'ok',
      });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    });
}

module.exports = {
  verificaHorarioService,
  marcarHorarioService,
};
