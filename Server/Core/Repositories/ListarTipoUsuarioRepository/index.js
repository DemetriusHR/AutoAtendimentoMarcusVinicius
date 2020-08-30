var { connectionBD } = require("../../Connection");

function listarTipoUsuarioRepository() {
  return new Promise(async function (resolve, reject) {
    connectionBD(`SELECT ID_Tipo_Usuario
                      ,NM_Tipo_Usuario
                  FROM Tipo_Usuario`, resolve, reject);
    pool.connect(function (err, client, done) {
      if (err) {
        reject("Erro na procura de dados: " + err);
        console.log("Erro na procura de dados: " + err);
        return;
      }

      client.query(
        ,
        function (erro, result) {
          if (erro) {
            reject("Erro na procura de dados: " + erro);
            console.log("Erro na procura de dados: " + erro);
            return;
          }

          done();
          resolve(result.rows);
        }
      );
    });
  });
}

module.exports = listarTipoUsuarioRepository;
