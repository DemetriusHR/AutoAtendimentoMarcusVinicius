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

function marcarHorarioRepository(data, idUsuario) {
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
        function (erro, result) {
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

function verificaAtendimentosPendentesRepository(dataInicial, dataFinal) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na procura de dados: ' + err);
        console.log('Erro na procura de dados: ' + err);
        return;
      }

      client.query(
        `SELECT ID_Atendimento     as idAtendimento
               ,DT_Atendimento     as dataAtendimento
               ,Usuario.ID_Usuario as idCliente
               ,Usuario.NM_Usuario as nomeCliente
        FROM Atendimento
          INNER JOIN Usuario
          ON Usuario.id_usuario = Atendimento.id_usuario
        WHERE DT_Atendimento        >= $1
          AND DT_Atendimento        <= $2
          AND Atendimento_Realizado = 'f'`,
        [dataInicial, dataFinal],
        function (erro, result) {
          if (erro) {
            reject('Erro na procura de dados: ' + erro);
            console.log('Erro na procura de dados: ' + erro);
            return;
          }

          resolve(result.rows);
          done();
        }
      );
    });
  });
}

module.exports = {
  verificaHorarioRepository,
  marcarHorarioRepository,
  verificaAtendimentosPendentesRepository,
};
