var { pool } = require("../../Connection");

function criarImovelRepository(imovel) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `INSERT INTO imovel (endereco_imovel, numero_imovel, cidade_imovel, estado_imovel, qt_quartos_imovel, qt_banheiros_imovel, detalhes_imovel, id_tipo_imovel)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          imovel.endereco,
          imovel.numero,
          imovel.cidade,
          imovel.estado,
          imovel.quartos,
          imovel.banheiros,
          imovel.detahes,
          imovel.tipoImovel,
        ],
        function (erro) {
          if (erro) {
            reject("Erro na procura de dados: " + erro);
            console.log("Erro na procura de dados: " + erro);
            return;
          }

          done();
          resolve();
        }
      );
    });
  });
}

module.exports = criarImovelRepository;
