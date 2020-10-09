var router = require("express").Router();
var listarTipoUsuarioService = require("../../Core/Services/ListarTipoUsuarioService");

router.route("/tipo-usuario").get(listarTipoUsuarioService);

module.exports = router;
