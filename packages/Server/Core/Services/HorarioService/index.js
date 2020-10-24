const log = require('../../../Logs');
const {
  verificaHorarioRepository,
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

module.exports = {
  verificaHorarioService,
};
