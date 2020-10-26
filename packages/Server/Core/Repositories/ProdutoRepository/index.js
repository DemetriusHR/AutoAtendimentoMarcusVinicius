const { pool } = require('../../Connection');

function listaProdutosRepository() {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na procura de dados: ' + err);
        console.log('Erro na procura de dados: ' + err);
        return;
      }

      client.query(
        `SELECT id_produto                                                as idproduto
               ,concat(nm_produto, ' - ', cor_produto, ' - ', no_produto) as nmproduto
         FROM produto`,
        function (erro, result) {
          if (erro) {
            reject('Erro na procura de dados: ' + erro);
            console.log('Erro na procura de dados: ' + erro);
            return;
          }

          resolve(result.rows);
          done();
        }
      );
    });
  });
}

function listaProdutoEspecificoRepository(id) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na procura de dados: ' + err);
        console.log('Erro na procura de dados: ' + err);
        return;
      }

      client.query(
        `SELECT id_produto                                                as idproduto
               ,concat(nm_produto, ' - ', cor_produto, ' - ', no_produto) as nmproduto
         FROM produto
         WHERE id_produto = $1`,
        [id],
        function (erro, result) {
          if (erro) {
            reject('Erro na procura de dados: ' + erro);
            console.log('Erro na procura de dados: ' + erro);
            return;
          }

          resolve(result.rows[0]);
          done();
        }
      );
    });
  });
}

module.exports = { listaProdutosRepository, listaProdutoEspecificoRepository };
