var { pool } = require("../../Connection");

function deletarTipoImovelRepository(id) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `DELETE FROM tipo_imovel
         WHERE id_tipo_imovel = $1`,
        [id],
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

module.exports = deletarTipoImovelRepository;
