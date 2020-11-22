const { pool } = require('../../Connection');

const format = require('pg-format');

function listaProdutosRepository() {
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

function listaProdutoEspecificoRepository(id) {
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

function listaPedidoPendenteProdutosRepository(idPedido) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT Produto.ID_Produto                                                                 AS idProduto
               ,concat(Produto.nm_produto, ' - ', Produto.cor_produto, ' - ', Produto.no_produto)  AS nmProduto
               ,PedidosProdutos.DES_Pedido_Pedido                                                  AS descricao
           FROM PedidosProdutos
             INNER JOIN Produto
             ON Produto.ID_Produto = PedidosProdutos.ID_Produto
           WHERE PedidosProdutos.ID_Atendimento = $1`,
        [idPedido],
        function (erro, result) {
          if (erro) {
            reject(erro);
            console.log(
              erro
            );
            return;
          }

          resolve(result.rows);
          done();
        }
      );
    });
  });
}

function listaPedidoPendenteProdutosClienteRepository(idPedido) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT Produto.ID_Produto                                    AS idProduto
               ,concat(Produto.NM_Produto, ' - ', Produto.NO_Produto) AS nmProduto
           FROM PedidosProdutos
             INNER JOIN Produto
             ON Produto.ID_Produto = PedidosProdutos.ID_Produto
           WHERE PedidosProdutos.ID_Atendimento = $1`,
        [idPedido],
        function (erro, result) {
          if (erro) {
            reject(erro);
            console.log(
              erro
            );
            return;
          }

          resolve(result.rows);
          done();
        }
      );
    });
  });
}

function cadastrarProdutosPedidoRepository(produtos = [{}]) {
  return new Promise(async function (resolve, reject) {
    const produtosMapeados = produtos.map(function (produto) {
      return [produto.idAtendimento, produto.idProduto, produto.descricao];
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
  listaProdutosRepository,
  listaProdutoEspecificoRepository,
  listaPedidoPendenteProdutosRepository,
  listaPedidoPendenteProdutosClienteRepository,
  cadastrarProdutosPedidoRepository,
};
