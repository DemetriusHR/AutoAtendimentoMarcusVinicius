const router = require('express').Router();

const {
  rotasAutorizadasGet,
} = require('../Utils/rotasAutorizadas');

const {
  listarInformacoesUsuarioService,
} = require('../../Core/Services/UsuarioService');

// GET - Informações do Usuários

rotasAutorizadasGet(
  router,
  '/usuario/:id',
  listarInformacoesUsuarioService
);

module.exports = router;
