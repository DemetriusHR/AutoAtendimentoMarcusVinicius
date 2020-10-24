const router = require('express').Router();
const validate = require('express-validation');

/// LOGIN

const loginValidator = require('../../Core/Validators/LoginValidator');
const cadastrarValidator = require('../../Core/Validators/CadastrarValidator');
const verificaAtendimentoValidator = require('../../Core/Validators/VerificaAtendimentoValidator');

const {
  loginService,
  cadastrarService,
} = require('../../Core/Services/LoginService');
const {
  verificaHorarioService,
} = require('../../Core/Services/HorarioService');

// POST - LOGIN

router.route('/login').post(validate(loginValidator), loginService);

// POST - CADASTRAR

router.route('/cadastrar').post(validate(cadastrarValidator), cadastrarService);

// POST - VERIFICA-HORARIO

router
  .route('/verifica-horario')
  .post(validate(verificaAtendimentoValidator), verificaHorarioService);

module.exports = router;
