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

function listaPedidoPendenteProdutosRepository(idPedido) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na listagem de produtos do pedido pendente: ' + err);
        console.log('Erro na listagem de produtos do pedido pendente: ' + err);
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
            reject('Erro na listagem de produtos do pedido pendente: ' + erro);
            console.log('Erro na listagem de produtos do pedido pendente: ' + erro);
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
        reject('Erro na listagem de produtos do pedido pendente: ' + err);
        console.log('Erro na listagem de produtos do pedido pendente: ' + err);
        return;
      }

      client.query(
        `SELECT Produto.ID_Produto AS idProduto
                ,Produto.NM_Produto AS nmProduto
           FROM PedidosProdutos
             INNER JOIN Produto
             ON Produto.ID_Produto = PedidosProdutos.ID_Produto
           WHERE PedidosProdutos.ID_Atendimento = $1`,
        [idPedido],
        function (erro, result) {
          if (erro) {
            reject('Erro na listagem de produtos do pedido pendente: ' + erro);
            console.log('Erro na listagem de produtos do pedido pendente: ' + erro);
            return;
          }

          resolve(result.rows);
          done();
        }
      );
    });
  });
}

module.exports = {
  listaProdutosRepository,
  listaProdutoEspecificoRepository,
  listaPedidoPendenteProdutosRepository,
  listaPedidoPendenteProdutosClienteRepository,
};
