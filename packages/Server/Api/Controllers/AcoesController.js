const router = require('express').Router();
const validate = require('express-validation');

const {
  rotasAutorizadasPost,
  rotasAutorizadasDeleteFuncionario,
  rotasAutorizadasPostFuncionario,
} = require('../Utils/rotasAutorizadas');

// VALIDATORS

const loginValidator = require('../../Core/Validators/LoginValidator');
const cadastrarValidator = require('../../Core/Validators/CadastrarValidator');
const verificaAtendimentoValidator = require('../../Core/Validators/VerificaAtendimentoValidator');
const marcarHorarioValidator = require('../../Core/Validators/MarcarHorarioValidator');
const cancelaAtendimentoValidator = require('../../Core/Validators/CancelaAtendimentoValidator');
const confirmarAtendimentoValidator = require('../../Core/Validators/ConfirmarAtendimentoValidator');
const confirmaEntregaPedidoValidator = require('../../Core/Validators/ConfirmaEntregaPedidoValidator');
const confirmaDevolucaoPedidoValidator = require('../../Core/Validators/ConfirmaDevolucaoPedidoValidator');

// SERVICES

const {
  loginService,
  cadastrarService,
} = require('../../Core/Services/LoginService');
const {
  verificaHorarioService,
  marcarHorarioService,
  cancelaAtendimentoService,
  confirmaAtendimentoService,
  pedidosPendentesConfirmaEntregaService,
  pedidosPendentesConfirmaDevolucaoService,
} = require('../../Core/Services/HorarioService');

// ROTAS

// POST - LOGIN

router.route('/login').post(validate(loginValidator), loginService);

// POST - CADASTRAR

router.route('/cadastrar').post(validate(cadastrarValidator), cadastrarService);

// POST - VERIFICA-HORARIO

router
  .route('/verifica-horario')
  .post(validate(verificaAtendimentoValidator), verificaHorarioService);

// POST - MARCAR-HORARIO

rotasAutorizadasPost(
  router,
  '/marcar-horario',
  validate(marcarHorarioValidator),
  marcarHorarioService
);

// DELETE - CANCELA-ATENDIMENTO

rotasAutorizadasDeleteFuncionario(
  router,
  '/cancela-atendimento',
  validate(cancelaAtendimentoValidator),
  cancelaAtendimentoService,
);

// POST - CONFIRMAR-ATENDIMENTO

rotasAutorizadasPost(
  router,
  '/confirmar-atendimento',
  validate(confirmarAtendimentoValidator),
  confirmaAtendimentoService
);

// POST - PEDIDO-PENDENTE/CONFIRMA-ENTREGA

rotasAutorizadasPostFuncionario(
  router,
  '/pedido-pendente/confirma-entrega',
  validate(confirmaEntregaPedidoValidator),
  pedidosPendentesConfirmaEntregaService,
);

// POST - PEDIDO-PENDENTE/CONFIRMA-DEVOLUCAO

rotasAutorizadasPostFuncionario(
  router,
  '/pedido-pendente/confirma-devolucao',
  validate(confirmaDevolucaoPedidoValidator),
  pedidosPendentesConfirmaDevolucaoService
);

module.exports = router;
