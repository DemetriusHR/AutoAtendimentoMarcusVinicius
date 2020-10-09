const {
  pool,
} = require('../../Connection');

function listarInformacoesUsuarioRepository(
  idUsuario
) {
  return new Promise(
    async function (
      resolve,
      reject
    ) {
      pool.connect(
        function (
          err,
          client,
          done
        ) {
          if (
            err
          ) {
            reject(
              'Erro na procura de dados: ' +
                err
            );
            console.log(
              'Erro na procura de dados: ' +
                err
            );
            return;
          }

          client.query(
            `SELECT nm_usuario  AS nome
                   ,cpf_usuario AS cpf
                   ,tel_usuario AS celular
             FROM usuario
             WHERE id_usuario = $1`,
            [
              idUsuario,
            ],
            function (
              erro,
              result
            ) {
              if (
                erro
              ) {
                reject(
                  'Erro na procura de dados: ' +
                    erro
                );
                console.log(
                  'Erro na procura de dados: ' +
                    erro
                );
                return;
              }
              resolve(
                result.rows
              );
              done();
            }
          );
        }
      );
    }
  );
}

module.exports = {
  listarInformacoesUsuarioRepository,
};
