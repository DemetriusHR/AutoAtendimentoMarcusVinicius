const router = require('express').Router();

// AUTORIZATION

const auth = require('../../../shared/middleware/authorize');

// VALIDATORS

const atendimentosPendentesValidator = require('../../../shared/middleware/validators/atendimentosPendentes');

// SERVICES

const usuarioService = require('../../../core/services/usuario');
const enderecoService = require('../../../core/services/endereco');
const atendimentoService = require('../../../core/services/atendimento');
const produtoService = require('../../../core/services/produto');
const pedidoService = require('../../../core/services/pedido');

// ROTAS

// USUARIO

//// GET - USUARIO/:ID

router.get('/usuario/:id', auth.authorize, usuarioService.listarInformacoes);

// ENDERECO

//// GET - /USUARIO/:ID/ENDERECOS

router.get(
  '/usuario/:id/enderecos',
  auth.authorize,
  enderecoService.listarUsuario
);

// ATENDIMENTO

//// POST - /ATENDIMENTOS-PENDENTES

router.post(
  '/atendimentos-pendentes',
  auth.authorizeEmployee,
  atendimentosPendentesValidator,
  atendimentoService.verificarPendentes
);

// PRODUTO

//// GET - /PRODUTOS

router.get('/produtos', auth.authorizeEmployee, produtoService.listar);

// GET - /PRODUTO/:ID

router.get(
  '/produto/:id',
  auth.authorizeEmployee,
  produtoService.listarEspecifico
);

// PEDIDO

//// GET - /PEDIDOS-PENDENTES

router.get(
  '/pedidos-pendentes',
  auth.authorizeEmployee,
  pedidoService.listarPendentes
);

//// GET - /PEDIDOS-PENDENTES/:ID

router.get(
  '/pedidos-pendentes/:id',
  auth.authorizeUser,
  pedidoService.listarPendentesCliente
);

//// GET - /PEDIDOS-PENDENTES-FUNCIONARIO/:ID/PRODUTOS

router.get(
  '/pedidos-pendentes-funcionario/:id/produtos',
  auth.authorizeEmployee,
  pedidoService.listarProdutos
);

module.exports = router;
