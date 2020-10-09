var { pool } = require("../../Connection");

function criarLoginRepository(nome, login, senha, situacao) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `INSERT INTO usuario (nm_usuario, login_usuario, senha_usuario, situacao_usuario)
         VALUES ($1, $2, $3, $4)`,
        [nome, login, senha, situacao],
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

module.exports = criarLoginRepository;
