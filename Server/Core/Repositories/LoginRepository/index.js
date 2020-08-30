var { pool } = require("../../Connection");

function loginRepository(login, senha) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `SELECT 1 FROM usuario WHERE login_usuario = $1 AND senha_usuario = $2`,
        [login, senha],
        function (erro, result) {
          if (erro) {
            reject("Erro na procura de dados: " + erro);
            console.log("Erro na procura de dados: " + erro);
            return;
          }
          resolve(result.rowCount > 0);
          done();
        }
      );
    });
  });
}

module.exports = loginRepository;
