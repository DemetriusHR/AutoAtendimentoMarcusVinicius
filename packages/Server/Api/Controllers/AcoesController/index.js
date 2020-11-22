const router = require('express').Router();
const validate = require('express-validation');

const {
  rotasAutorizadasPost,
  rotasAutorizadasPut,
  rotasAutorizadasDelete,
  rotasAutorizadasDeleteFuncionario,
  rotasAutorizadasPostFuncionario,
} = require('../../Utils/rotasAutorizadas');

// VALIDATORS

const loginValidator = require('../../../Core/Validators/LoginValidator');
const cadastrarValidator = require('../../../Core/Validators/CadastrarValidator');
const verificaAtendimentoValidator = require('../../../Core/Validators/VerificaAtendimentoValidator');
const marcarHorarioValidator = require('../../../Core/Validators/MarcarHorarioValidator');
const cancelaAtendimentoValidator = require('../../../Core/Validators/CancelaAtendimentoValidator');
const confirmarAtendimentoValidator = require('../../../Core/Validators/ConfirmarAtendimentoValidator');
const confirmaEntregaPedidoValidator = require('../../../Core/Validators/ConfirmaEntregaPedidoValidator');
const confirmaDevolucaoPedidoValidator = require('../../../Core/Validators/ConfirmaDevolucaoPedidoValidator');
const editarUsuarioValidator = require('../../../Core/Validators/EditarUsuarioValidator');
const editarEnderecoUsuarioValidator = require('../../../Core/Validators/EditarEnderecoUsuarioValidator');
const adicionarEnderecoUsuarioValidator = require('../../../Core/Validators/AdicionarEnderecoUsuarioValidator');

// SERVICES

const {
  loginService,
  cadastrarService,
  cadastrarEnderecoUsuarioService,
} = require('../../../Core/Services/LoginService');

const {
  verificaHorarioService,
  marcarHorarioService,
  cancelaAtendimentoService,
  confirmaAtendimentoService,
  pedidosPendentesConfirmaEntregaService,
  pedidosPendentesConfirmaDevolucaoService,
} = require('../../../Core/Services/HorarioService');

const {
  editarUsuarioService,
  editarEnderecoService,
  excluirEnderecoService,
  excluirUsuarioService,
} = require('../../../Core/Services/UsuarioService');

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
  cancelaAtendimentoService
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
  pedidosPendentesConfirmaEntregaService
);

// POST - PEDIDO-PENDENTE/CONFIRMA-DEVOLUCAO

rotasAutorizadasPostFuncionario(
  router,
  '/pedido-pendente/confirma-devolucao',
  validate(confirmaDevolucaoPedidoValidator),
  pedidosPendentesConfirmaDevolucaoService
);

// PUT - USUARIO/EDITAR

rotasAutorizadasPut(
  router,
  '/usuario/editar',
  validate(editarUsuarioValidator),
  editarUsuarioService
);

// PUT - USUARIO/ENDERECO/EDITAR

rotasAutorizadasPut(
  router,
  '/usuario/endereco/editar',
  validate(editarEnderecoUsuarioValidator),
  editarEnderecoService
);

// DELETE - USUARIO/:ID

rotasAutorizadasDelete(router, '/usuario/:id', excluirUsuarioService);

// PUT - USUARIO/ENDERECO/:ID/EDITAR

rotasAutorizadasDelete(
  router,
  '/usuario/endereco/:id',
  excluirEnderecoService
);

// POST - USUARIO/ENDERECO

rotasAutorizadasPost(
  router,
  '/usuario/endereco',
  validate(adicionarEnderecoUsuarioValidator),
  cadastrarEnderecoUsuarioService
);

module.exports = router;
