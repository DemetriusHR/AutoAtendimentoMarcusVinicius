var { pool } = require("../../Connection");

function listarImoveisRepository() {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `SELECT id_imovel             AS id_imovel
               ,nm_tipo_imovel        AS nome
               ,endereco_imovel       AS endereco
               ,numero_imovel         AS numero
               ,cidade_imovel         AS cidade
               ,estado_imovel         AS estado
               ,qt_quartos_imovel     AS quartos
               ,qt_banheiros_imovel   AS banheiros
               ,detalhes_imovel       AS detahes
               ,imovel.id_tipo_imovel AS tipoImovel
         FROM tipo_imovel
         INNER JOIN imovel
         ON tipo_imovel.id_tipo_imovel = imovel.id_tipo_imovel`,
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

module.exports = listarImoveisRepository;
