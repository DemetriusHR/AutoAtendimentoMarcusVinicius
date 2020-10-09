const express = require('express');

const acoesController = require('./Controllers/AcoesController');

const listagemController = require('./Controllers/ListagemController');

const router = express.Router();

router.use(
  '/acoes',
  acoesController
);
router.use(
  '/listagens',
  listagemController
);

module.exports = router;
