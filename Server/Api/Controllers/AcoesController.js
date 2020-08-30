var router = require("express").Router();
var validate = require("express-validation");

/// LOGIN

// - Verificação de Login

var loginValidator = require("../../Core/Validators/LoginValidator");
var loginService = require("../../Core/Services/LoginService");

router.route("/login").post(validate(loginValidator), loginService);

// - Criação de Login

var criarLoginValidator = require("../../Core/Validators/CriarLoginValidator");
var criarLoginService = require("../../Core/Services/CriarLoginService");

router
  .route("/login/criar")
  .post(validate(criarLoginValidator), criarLoginService);

// - Editagem de Login

var editarLoginValidator = require("../../Core/Validators/EditarLoginValidator");
var editarLoginService = require("../../Core/Services/EditarLoginService");

router
  .route("/login/editar")
  .put(validate(editarLoginValidator), editarLoginService);

/// IMOVEL

// - Criação de Imovel

var criarImovelValidator = require("../../Core/Validators/CriarImovelValidator");
var criarImovelService = require("../../Core/Services/CriarImovelService");

router
  .route("/imovel/criar")
  .post(validate(criarImovelValidator), criarImovelService);

// - Editagem de Imovel

var editarImovelValidator = require("../../Core/Validators/EditarImovelValidator");
var editarImovelService = require("../../Core/Services/EditarImovelService");

router
  .route("/imovel/editar")
  .put(validate(editarImovelValidator), editarImovelService);

// - Exclusão de Imovel

var deletarImovelValidator = require("../../Core/Validators/DeletarImovelValidator");
var deletarImovelService = require("../../Core/Services/DeletarImovelService");

router
  .route("/imovel/deletar")
  .delete(validate(deletarImovelValidator), deletarImovelService);

/// TIPO DE IMOVEIS

// - Criação de Tipo de Imovel

var criarTipoImovelValidator = require("../../Core/Validators/CriarTipoImovelValidator");
var criarTipoImovelService = require("../../Core/Services/CriarTipoImovelService");

router
  .route("/tipo-imovel/criar")
  .post(validate(criarTipoImovelValidator), criarTipoImovelService);

// - Editagem de Tipo de Imovel

var editarTipoImovelValidator = require("../../Core/Validators/EditarTipoImovelValidator");
var editarTipoImovelService = require("../../Core/Services/EditarTipoImovelService");

router
  .route("/tipo-imovel/editar")
  .put(validate(editarTipoImovelValidator), editarTipoImovelService);

// - Exclusão de Tipo de Imovel

var deletarTipoImovelValidator = require("../../Core/Validators/DeletarTipoImovelValidator");
var deletarTipoImovelService = require("../../Core/Services/DeletarTipoImovelService");

router
  .route("/tipo-imovel/deletar")
  .delete(validate(deletarTipoImovelValidator), deletarTipoImovelService);

module.exports = router;
