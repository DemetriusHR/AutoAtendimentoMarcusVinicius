const router = require('express').Router();
const validate = require('express-validation');

const { rotasAutorizadasPost } = require('../Utils/rotasAutorizadas');

// VALIDATORS

const loginValidator = require('../../Core/Validators/LoginValidator');
const cadastrarValidator = require('../../Core/Validators/CadastrarValidator');
const verificaAtendimentoValidator = require('../../Core/Validators/VerificaAtendimentoValidator');
const marcarHorarioValidator = require('../../Core/Validators/MarcarHorarioValidator');

// SERVICES

const {
  loginService,
  cadastrarService,
} = require('../../Core/Services/LoginService');
const {
  verificaHorarioService,
  marcarHorarioService,
} = require('../../Core/Services/HorarioService');

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

module.exports = router;
