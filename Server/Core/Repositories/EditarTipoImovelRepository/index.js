var { pool } = require("../../Connection");

function editarTipoImovelRepository(nome, status, id) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `UPDATE tipo_imovel
         SET nm_tipo_imovel = $1, status_tipo_imovel = $2
         WHERE id_tipo_imovel = $3`,
        [nome, status, id],
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

module.exports = editarTipoImovelRepository;
