const jwt = require('jsonwebtoken');

const roles = require('../middleware/roles');

const secret = process.env.SECRET_KEY_JWT;

function createAuth(login = { idUsuario: 0, funcionario: false }) {
  const token = jwt.sign(
    {
      sub: login.idUsuario,
      role: login.funcionario ? roles.Employee : roles.User,
    },
    secret,
    {
      expiresIn: '7d',
    }
  );

  return token;
}

module.exports = createAuth;
