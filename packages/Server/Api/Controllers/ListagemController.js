const router = require('express').Router();
const validate = require('express-validation');

const {
  rotasAutorizadasGet,
  rotasAutorizadasPostFuncionario,
  rotasAutorizadasGetFuncionario,
} = require('../Utils/rotasAutorizadas');

// VALIDATORS

const atendimentosPendentesValidator = require('../../Core/Validators/AtendimentosPendentesValidator');

// SERVICES

const {
  listarInformacoesUsuarioService,
} = require('../../Core/Services/UsuarioService');

const {
  verificaAtendimentosPendentesService,
  listaPedidosPendentesClienteService,
  listaPedidosPendentesService,
} = require('../../Core/Services/HorarioService');

const {
  listaProdutosService,
  listaProdutoEspecificoService,
  listaPedidoPendenteProdutosService,
  listaPedidoPendenteProdutosClienteService,
} = require('../../Core/Services/ProdutoService');

// ROTAS

// GET - Informações do Usuários

rotasAutorizadasGet(router, '/usuario/:id', listarInformacoesUsuarioService);

// POST - Atendimentos Pendentes

rotasAutorizadasPostFuncionario(
  router,
  '/atendimentos-pendentes',
  validate(atendimentosPendentesValidator),
  verificaAtendimentosPendentesService
);

// GET - Lista de Produtos

rotasAutorizadasGetFuncionario(router, '/produtos', listaProdutosService);

// GET - Lista de Produto Especifico

rotasAutorizadasGetFuncionario(
  router,
  '/produto/:id',
  listaProdutoEspecificoService
);

// GET - Lista de Pedidos Pendentes

rotasAutorizadasGetFuncionario(
  router,
  '/pedidos-pendentes',
  listaPedidosPendentesService
);

// GET - Lista de Pedidos Pendentes do Cliente

rotasAutorizadasGet(
  router,
  '/pedidos-pendentes/:id',
  listaPedidosPendentesClienteService
);

// GET - Lista de Produtos do Pedido Pendente do Cliente

rotasAutorizadasGet(
  router,
  '/pedido-pendente/:id/produtos',
  listaPedidoPendenteProdutosClienteService
);

// GET - Lista de Produtos do Pedido Pendente do Funcionario

rotasAutorizadasGetFuncionario(
  router,
  '/pedido-pendente-funcionario/:id/produtos',
  listaPedidoPendenteProdutosService
);

module.exports = router;
