const express = require('express');

const acoesController = require('./controllers/acoes');

const listagemController = require('./controllers/listagens');

const router = express.Router();

router.use('/acoes', acoesController);
router.use('/listagens', listagemController);

module.exports = router;
