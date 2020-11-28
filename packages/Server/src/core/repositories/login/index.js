const pool = require('../../../shared/connection');

function loginRepository(cpf, tel, senha) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT login_atendimento($1, $2, $3)`,
        [cpf, tel, senha],
        function (erro, result) {
          if (erro) {
            reject(erro);
            console.log(erro);
            return;
          }

          const { login_atendimento } = result.rows[0];

          const idUsuario = parseInt(
            login_atendimento.substring(1, login_atendimento.indexOf(','))
          );

          const funcionario =
            login_atendimento.substring(
              login_atendimento.indexOf(',') + 1,
              login_atendimento.indexOf(')')
            ) === 't';

          resolve({
            idUsuario,
            funcionario,
          });
          done();
        }
      );
    });
  });
}

function cadastrarUsuarioRepository(nome, cpf, senha, tel) {
  return new Promise(async function (resolve, reject) {
    let idUsuario = 0;

    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      await client.query(
        `SELECT cadastrar_usuario($1, $2, $3, $4)`,
        [nome, cpf, senha, tel],
        function (erro, result) {
          if (erro) {
            reject(erro);
            console.log(erro);
            return;
          }

          idUsuario = result.rows[0].cadastrar_usuario;

          resolve({
            idUsuario,
          });

          done();
        }
      );
    });
  });
}

module.exports = {
  login: loginRepository,
  cadastrarUsuario: cadastrarUsuarioRepository,
};
