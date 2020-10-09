var { pool } = require("../../Connection");

function criarTipoImovelRepository(nome, status) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `INSERT INTO tipo_imovel (nm_tipo_imovel, status_tipo_imovel)
         VALUES ('${nome}', ${status})`,
        [nome, status],
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

module.exports = criarTipoImovelRepository;
