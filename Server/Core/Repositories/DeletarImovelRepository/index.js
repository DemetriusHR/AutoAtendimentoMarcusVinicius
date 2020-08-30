var { pool } = require("../../Connection");

function deletarImovelRepository(id) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `DELETE FROM imovel
        WHERE id_tipo_imovel = $1}`,
        [id],
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

module.exports = deletarImovelRepository;
