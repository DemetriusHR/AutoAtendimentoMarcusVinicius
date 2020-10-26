const log = require('../../../Logs');
const {
  listaProdutosRepository,
  listaProdutoEspecificoRepository,
} = require('../../Repositories/ProdutoRepository');

function listaProdutosService(_, res) {
  listaProdutosRepository()
    .then((dataRetornada) => {
      res.json({
        status: 200,
        message: 'ok',
        data: dataRetornada,
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

function listaProdutoEspecificoService(req, res) {
  const idUsuario = parseInt(req.params.id);

  listaProdutoEspecificoRepository(idUsuario)
    .then((dataRetornada) => {
      res.json({
        status: 200,
        message: 'ok',
        data: dataRetornada,
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
  listaProdutosService,
  listaProdutoEspecificoService,
};
