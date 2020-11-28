const pool = require('../../../shared/connection');

function verificarRepository(data) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT 1
         FROM Atendimento
         WHERE DT_Atendimento = $1`,
        [data],
        function (erro, result) {
          if (erro) {
            reject(erro);
            console.log(erro);
            return;
          }

          resolve(result.rows[0]);
          done();
        }
      );
    });
  });
}

function marcarRepository(data, idUsuario) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na marcação de horário: ' + err);
        console.log('Erro na marcação de horário: ' + err);
        return;
      }

      client.query(
        `CALL cadastrar_atendimento($1, $2)`,
        [data, idUsuario],
        function (erro) {
          if (erro) {
            reject('Erro na marcação de horário: ' + erro);
            console.log('Erro na marcação de horário: ' + erro);
            return;
          }

          resolve();
          done();
        }
      );
    });
  });
}

module.exports = {
  marcar: marcarRepository,
  verificar: verificarRepository,
};
