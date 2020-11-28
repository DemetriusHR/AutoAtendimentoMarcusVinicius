const response = require('../../../shared/middleware/response');
const atendimentoRepository = require('../../repositories/atendimento');
const produtoRepository = require('../../repositories/produto');
const pedidoRepository = require('../../repositories/pedido');

function verificarPendentesService(req, res) {
  const { dataInicial, dataFinal } = req.body;

  atendimentoRepository
    .verificarPendentes(dataInicial, dataFinal)
    .then((dataRetornada) => {
      response.sucess(res, dataRetornada);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function cancelarService(req, res) {
  const { idAtendimento } = req.body;

  atendimentoRepository
    .atualizar(idAtendimento)
    .then(() => {
      response.sucess(res);
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

function confirmarService(req, res) {
  const {
    idAtendimento,
    dataPedido,
    dataDevolucao,
    vlPedido,
    produtos,
  } = req.body;

  atendimentoRepository
    .atualizar(idAtendimento)
    .then(() => {
      pedidoRepository
        .cadastrar(idAtendimento, dataPedido, dataDevolucao, vlPedido)
        .then(() => {
          produtoRepository
            .cadastrarPedido(produtos)
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
    })
    .catch((e) => {
      response.errorServer(res, e);
    });
}

module.exports = {
  verificarPendentes: verificarPendentesService,
  cancelar: cancelarService,
  confirmar: confirmarService,
};
