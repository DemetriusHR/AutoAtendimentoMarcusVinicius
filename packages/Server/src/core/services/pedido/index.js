const response = require('../../../shared/middleware/response');
const pedidoRepository = require('../../repositories/pedido');

function listarPendentesClienteService(req, res) {
  const idUsuario = parseInt(req.params.id);

  pedidoRepository
    .listarPendentesCliente(idUsuario)
    .then((dataRetornada) => {
      response.sucess(res, dataRetornada);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function listarPendentesService(_, res) {
  pedidoRepository
    .listarPendentes()
    .then((dataRetornada) => {
      response.sucess(res, dataRetornada);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function confirmarEntregaService(req, res) {
  const { idPedido } = req.body;

  pedidoRepository
    .confirmarEntrega(idPedido)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function confirmarDevolucaoService(req, res) {
  const { idPedido } = req.body;

  pedidoRepository
    .confirmarDevolucao(idPedido)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function cancelarService(req, res) {
  const { idPedido } = req.body;

  pedidoRepository
    .confirmarEntrega(idPedido)
    .then(() => {
      pedidoRepository
        .confirmarDevolucao(idPedido)
        .then(() => {
          response.sucess(res);
        })
        .catch((e) => {
          response.errorServer(res, e);
        });
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function listarProdutosService(req, res) {
  const idPedido = parseInt(req.params.id);

  pedidoRepository
    .listarProdutos(idPedido)
    .then((dataRetornada) => {
      response.sucess(res, dataRetornada);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function listarProdutosClienteService(req, res) {
  const idPedido = parseInt(req.params.id);

  pedidoRepository
    .listarProdutosCliente(idPedido)
    .then((dataRetornada) => {
      response.sucess(res, dataRetornada);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

module.exports = {
  listarPendentesCliente: listarPendentesClienteService,
  listarPendentes: listarPendentesService,
  listarProdutos: listarProdutosService,
  listarProdutosCliente: listarProdutosClienteService,
  confirmarEntrega: confirmarEntregaService,
  confirmarDevolucao: confirmarDevolucaoService,
  cancelar: cancelarService,
};
