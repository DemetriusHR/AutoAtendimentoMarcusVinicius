var express = require("express");

var acoesController = require("./Controllers/AcoesController");

var listagemController = require("./Controllers/ListagemController");

var router = express.Router();

router.use("/acoes", acoesController);
router.use("/listagens", listagemController);

module.exports = router;
