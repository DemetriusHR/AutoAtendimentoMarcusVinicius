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
} = require('../../Core/Services/HorarioService');

const {
  listaProdutosService,
  listaProdutoEspecificoService,
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

rotasAutorizadasGetFuncionario(router, '/produto/:id', listaProdutoEspecificoService);

module.exports = router;
