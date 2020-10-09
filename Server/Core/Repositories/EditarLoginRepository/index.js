var { pool } = require("../../Connection");

function editarLoginRepository(login) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `UPDATE usuario
         SET nm_usuario = $1
            ,login_usuario = $2
            ,senha_usuario = $3
            ,situacao_usuario = $4
         WHERE id_usuario = $5`,
        [
          login.nome,
          login.login,
          login.senha,
          login.situacao,
          login.id,
          login.id,
        ],
        function (erro) {
          if (erro) {
            reject("Erro na procura de dados: " + erro);
            console.log("Erro na procura de dados: " + erro);
            return;
          }
          resolve();
          done();
        }
      );
    });
  });
}

module.exports = editarLoginRepository;
