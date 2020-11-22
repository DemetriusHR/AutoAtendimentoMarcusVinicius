const log = require('../../../Logs');
const {
  verificaHorarioRepository,
  marcarHorarioRepository,
  verificaAtendimentosPendentesRepository,
  atualizaAtendimentoRepository,
  cadastrarPedidoRepository,
  listaPedidosPendentesClienteRepository,
  listaPedidosPendentesRepository,
  pedidosPendentesConfirmaDevolucaoRepository,
  pedidosPendentesConfirmaEntregaRepository,
} = require('../../Repositories/HorarioRepository');
const {
  cadastrarProdutosPedidoRepository,
} = require('../../Repositories/ProdutoRepository');

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

function verificaAtendimentosPendentesService(req, res) {
  const { dataInicial, dataFinal } = req.body;

  verificaAtendimentosPendentesRepository(dataInicial, dataFinal)
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

function cancelaAtendimentoService(req, res) {
  const { idAtendimento } = req.body;

  atualizaAtendimentoRepository(idAtendimento)
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

function confirmaAtendimentoService(req, res) {
  const {
    idAtendimento,
    dataPedido,
    dataDevolucao,
    vlPedido,
    produtos,
  } = req.body;

  atualizaAtendimentoRepository(idAtendimento)
    .then(() => {
      cadastrarPedidoRepository(
        idAtendimento,
        dataPedido,
        dataDevolucao,
        vlPedido
      )
        .then(() => {
          cadastrarProdutosPedidoRepository(produtos)
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
        })
        .catch((e) => {
          log.error(e.toString());
          res.status(500).json({
            status: 500,
            message: e.toString(),
          });
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

function listaPedidosPendentesClienteService(req, res) {
  const idUsuario = parseInt(req.params.id);

  listaPedidosPendentesClienteRepository(idUsuario)
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

function listaPedidosPendentesService(_, res) {
  listaPedidosPendentesRepository()
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

function pedidosPendentesConfirmaEntregaService(req, res) {
  const { idPedido } = req.body;

  pedidosPendentesConfirmaEntregaRepository(idPedido)
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

function pedidosPendentesConfirmaDevolucaoService(req, res) {
  const { idPedido } = req.body;

  pedidosPendentesConfirmaDevolucaoRepository(idPedido)
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
  verificaAtendimentosPendentesService,
  cancelaAtendimentoService,
  confirmaAtendimentoService,
  listaPedidosPendentesClienteService,
  listaPedidosPendentesService,
  pedidosPendentesConfirmaEntregaService,
  pedidosPendentesConfirmaDevolucaoService,
};
