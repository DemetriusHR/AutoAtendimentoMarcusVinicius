const pool = require('../../../shared/connection');

const format = require('pg-format');

function listarRepository() {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT id_produto                                                as idproduto
               ,concat(nm_produto, ' - ', cor_produto, ' - ', no_produto) as nmproduto
         FROM produto`,
        function (erro, result) {
          if (erro) {
            reject(erro);
            console.log(erro);
            return;
          }

          resolve(result.rows);
          done();
        }
      );
    });
  });
}

function listarEspecificoRepository(id) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
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
            reject(erro);
            console.log(erro);
            return;
          }

          resolve(result.rows[0]);
          done();
        }
      );
    });
  });
}

function cadastrarPedidoRepository(produtos = [{}]) {
  return new Promise(async function (resolve, reject) {
    const produtosMapeados = produtos.map(function (produto) {
      return [produto.idAtendimento, produto.idProduto, produto.detalhes];
    });

    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      const query = format(
        `INSERT INTO PedidosProdutos(ID_Atendimento, ID_Produto, DES_Pedido_Pedido)
         VALUES %L`,
        produtosMapeados
      );

      await client.query(query, function (erro) {
        if (erro) {
          reject(erro);
          console.log(erro);
          return;
        }

        resolve();

        done();
      });
    });
  });
}

module.exports = {
  listar: listarRepository,
  listarEspecifico: listarEspecificoRepository,
  cadastrarPedido: cadastrarPedidoRepository,
};
