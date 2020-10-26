const jwt = require('jsonwebtoken');

const roles = require('./roles');
const { secret } = require('../../config.json');

function authorize(
  req = {
    headers: {
      authorization: '',
    },
  },
  res,
  next
) {
  const idUsuario = parseInt(req.params.id || req.body.id);

  const token = req.headers.authorization.substring(7) || '';

  jwt.verify(token, secret, function (
    err,
    decoded = {
      sub: 0,
      role: '',
    }
  ) {
    if (idUsuario !== decoded.sub && !roles[decoded.role] && err) {
      return res.status(401).json({
        status: 401,
        message: 'Não Autorizado!',
      });
    } else {
      next();
    }
  });
}

function authorizeFuncionario(
  req = {
    headers: {
      authorization: '',
    },
  },
  res,
  next
) {
  const idUsuario = parseInt(req.params.id || req.body.id);

  const token = req.headers.authorization.substring(7) || '';

  jwt.verify(token, secret, function (
    err,
    decoded = {
      sub: 0,
      role: '',
    }
  ) {
    if (idUsuario !== decoded.sub && roles.Funcionario !== decoded.role && err) {
      return res.status(401).json({
        status: 401,
        message: 'Não Autorizado!',
      });
    } else {
      next();
    }
  });
}

module.exports = { authorize, authorizeFuncionario };
