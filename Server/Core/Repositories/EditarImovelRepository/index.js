var { pool } = require("../../Connection");

function editarImovelRepository(imovel) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        `UPDATE imovel
         SET endereco_imovel = $1
            ,numero_imovel = $2
            ,cidade_imovel = $3
            ,estado_imovel = $4
            ,qt_quartos_imovel = $5
            ,qt_banheiros_imovel = $6
            ,detalhes_imovel = $7
            ,id_tipo_imovel = $8
         WHERE id_tipo_imovel = $9`,
        [
          imovel.endereco,
          imovel.numero,
          imovel.cidade,
          imovel.estado,
          imovel.quartos,
          imovel.banheiros,
          imovel.detahes,
          imovel.tipoImovel,
          imovel.id,
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

module.exports = editarImovelRepository;
