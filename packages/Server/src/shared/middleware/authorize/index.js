const jwt = require('jsonwebtoken');

const response = require('../response');
const roles = require('../roles');

const secret = process.env.SECRET_KEY_JWT;

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
      response.errorAuth(res);
    } else {
      next();
    }
  });
}

function authorizeEmployee(
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
    if (idUsuario !== decoded.sub && roles.Employee !== decoded.role && err) {
      response.errorAuth(res);
    } else {
      next();
    }
  });
}

function authorizeUser(
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
    if (idUsuario !== decoded.sub && roles.User !== decoded.role && err) {
      response.errorAuth(res);
    } else {
      next();
    }
  });
}

module.exports = { authorize, authorizeEmployee, authorizeUser };
