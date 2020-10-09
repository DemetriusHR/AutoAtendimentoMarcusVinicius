const jwt = require('jsonwebtoken');

const roles = require('../../../Api/Utils/roles');
const {
  loginRepository,
  cadastrarUsuarioRepository,
  cadastrarEnderecosUsuarioRepository,
} = require('../../Repositories/LoginRepository');
const log = require('../../../Logs');
const config = require('../../../config.json');

function loginService(
  req,
  res
) {
  const {
    cpf,
    tel,
    senha,
  } = req.body;
  loginRepository(
    cpf,
    tel,
    senha
  )
    .then(
      (
        loginVerify
      ) => {
        const token = jwt.sign(
          {
            sub:
              loginVerify.idUsuario,
            role: loginVerify.funcionario
              ? roles.Funcionario
              : roles.User,
          },
          config.secret,
          {
            expiresIn:
              '7d',
          }
        );
        res.json(
          {
            status: 200,
            message:
              'ok',
            data: {
              loginVerify,
              token,
            },
          }
        );
      }
    )
    .catch(
      (
        e
      ) => {
        log.error(
          e.toString()
        );
        res
          .status(
            500
          )
          .json(
            {
              status: 500,
              message: e.toString(),
            }
          );
      }
    );
}

function cadastrarService(
  req,
  res
) {
  const {
    nome,
    cpf,
    senha,
    tel,
    enderecos,
  } = req.body;

  let idUsuario = 0;

  cadastrarUsuarioRepository(
    nome,
    cpf,
    senha,
    tel
  )
    .then(
      (
        data
      ) => {
        idUsuario =
          data.idUsuario;

        cadastrarEnderecosUsuarioRepository(
          idUsuario,
          enderecos
        )
          .then(
            (
              data
            ) => {
              res.json(
                {
                  status: 200,
                  message:
                    'ok',
                  data,
                }
              );
            }
          )
          .catch(
            (
              e
            ) => {
              log.error(
                e.toString()
              );
              res
                .status(
                  500
                )
                .json(
                  {
                    status: 500,
                    message: e.toString(),
                  }
                );
            }
          );
      }
    )
    .catch(
      (
        e
      ) => {
        log.error(
          e.toString()
        );
        res
          .status(
            500
          )
          .json(
            {
              status: 500,
              message: e.toString(),
            }
          );
      }
    );
}

module.exports = {
  loginService,
  cadastrarService,
};
