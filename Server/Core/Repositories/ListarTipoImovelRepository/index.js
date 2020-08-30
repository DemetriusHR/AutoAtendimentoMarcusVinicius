var { pool } = require("../../Connection");

function listarTipoImoveisRepository() {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `SELECT id_tipo_imovel     AS id_tipo_imovel 
               ,nm_tipo_imovel     AS nome
               ,status_tipo_imovel AS status
         FROM tipo_imovel`,
        function (erro, result) {
          if (erro) {
            reject("Erro na procura de dados: " + erro);
            console.log("Erro na procura de dados: " + erro);
            return;
          }
          resolve(result.rows);
          done();
        }
      );
    });
  });
}

module.exports = listarTipoImoveisRepository;
