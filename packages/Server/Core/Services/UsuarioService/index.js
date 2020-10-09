const log = require('../../../Logs');
const {
  listarInformacoesUsuarioRepository,
} = require('../../Repositories/UsuarioRepository');

function listarInformacoesUsuarioService(
  req,
  res
) {
  const idUsuario = parseInt(
    req
      .params
      .id
  );

  listarInformacoesUsuarioRepository(
    idUsuario
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

module.exports = {
  listarInformacoesUsuarioService,
};
