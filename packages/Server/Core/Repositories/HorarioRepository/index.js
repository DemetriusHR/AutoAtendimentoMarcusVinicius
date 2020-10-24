const { pool } = require('../../Connection');

function verificaHorarioRepository(data) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na procura de dados: ' + err);
        console.log('Erro na procura de dados: ' + err);
        return;
      }

      client.query(
        `SELECT 1
         FROM Atendimento
         WHERE DT_Atendimento = $1`,
        [data],
        function (erro, result) {
          if (erro) {
            reject('Erro na procura de dados: ' + erro);
            console.log('Erro na procura de dados: ' + erro);
            return;
          }

          resolve(result.rows[0]);
          done();
        }
      );
    });
  });
}

module.exports = {
  verificaHorarioRepository,
};
