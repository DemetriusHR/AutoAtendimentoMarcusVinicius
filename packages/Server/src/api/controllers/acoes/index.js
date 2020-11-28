const router = require('express').Router();

// AUTORIZATION

const auth = require('../../../shared/middleware/authorize');

// VALIDATORS

const loginValidator = require('../../../shared/middleware/validators/login');
const cadastrarValidator = require('../../../shared/middleware/validators/cadastrar');
const verificaAtendimentoValidator = require('../../../shared/middleware/validators/verificaAtendimento');
const marcarHorarioValidator = require('../../../shared/middleware/validators/marcarHorario');
const cancelarAtendimentoValidator = require('../../../shared/middleware/validators/cancelarAtendimento');
const confirmarAtendimentoValidator = require('../../../shared/middleware/validators/confirmarAtendimento');
const confirmaEntregaPedidoValidator = require('../../../shared/middleware/validators/confirmaEntregaPedido');
const confirmaDevolucaoPedidoValidator = require('../../../shared/middleware/validators/confirmaDevolucaoPedido');
const editarUsuarioValidator = require('../../../shared/middleware/validators/editarUsuario');
const editarEnderecoUsuarioValidator = require('../../../shared/middleware/validators/editarEnderecoUsuario');
const adicionarEnderecoUsuarioValidator = require('../../../shared/middleware/validators/adicionarEnderecoUsuario');

// SERVICES

const loginService = require('../../../core/services/login');
const horarioService = require('../../../core/services/horario');
const atendimentoService = require('../../../core/services/atendimento');
const pedidoService = require('../../../core/services/pedido');
const usuarioService = require('../../../core/services/usuario');
const enderecoService = require('../../../core/services/endereco');

// ROTAS

// LOGIN

//// POST - LOGIN

router.post('/login', loginValidator, loginService.login);

//// POST - CADASTRAR

router.post('/cadastrar', cadastrarValidator, loginService.login);

// HORARIO

///// POST - VERIFICA-HORARIO

router.post(
  '/verifica-horario',
  verificaAtendimentoValidator,
  horarioService.verificar
);

//// POST - MARCAR-HORARIO

router.post(
  '/marcar-horario',
  auth.authorizeUser,
  marcarHorarioValidator,
  horarioService.marcar
);

// ATENDIMENTO

//// DELETE - CANCELAR-ATENDIMENTO

router.delete(
  '/cancelar-atendimento',
  auth.authorizeEmployee,
  cancelarAtendimentoValidator,
  atendimentoService.cancelar
);

//// POST - CONFIRMAR-ATENDIMENTO

router.post(
  '/confirmar-atendimento',
  auth.authorizeEmployee,
  confirmarAtendimentoValidator,
  atendimentoService.confirmar
);

// PEDIDO

//// POST - PEDIDO-PENDENTE/CONFIRMAR-ENTREGA

router.post(
  '/pedido-pendente/confirmar-entrega',
  auth.authorizeEmployee,
  confirmaEntregaPedidoValidator,
  pedidoService.confirmarEntrega
);

//// POST - PEDIDO-PENDENTE/CONFIRMAR-DEVOLUCAO

router.post(
  '/pedido-pendente/confirmar-devolucao',
  auth.authorizeEmployee,
  confirmaDevolucaoPedidoValidator,
  pedidoService.confirmarDevolucao
);

//// POST - PEDIDO-PENDENTE/CONFIRMAR-DEVOLUCAO

router.delete(
  '/pedido-pendente/cancelar',
  auth.authorizeUser,
  pedidoService.cancelar
);

// USUARIO

//// PUT - USUARIO/EDITAR

router.put(
  '/usuario/editar',
  auth.authorize,
  editarUsuarioValidator,
  usuarioService.editar
);

//// DELETE - USUARIO/:ID

router.delete('/usuario/:id', auth.authorize, usuarioService.excluir);

// ENDERECO

//// PUT - USUARIO/ENDERECO/EDITAR

router.put(
  '/usuario/endereco/editar',
  auth.authorize,
  editarEnderecoUsuarioValidator,
  enderecoService.editar
);

//// DELETE - USUARIO/ENDERECO/:ID/EDITAR

router.delete(
  '/usuario/endereco/:id/editar',
  auth.authorize,
  enderecoService.excluir
);

//// POST - USUARIO/ENDERECO

router.post(
  '/usuario/endereco',
  auth.authorize,
  adicionarEnderecoUsuarioValidator,
  enderecoService.cadastrarUsuario
);

module.exports = router;
