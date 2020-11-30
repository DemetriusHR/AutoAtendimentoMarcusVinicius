const pool = require('../../../shared/connection');

function cadastrarRepository(
  idAtendimento,
  dataPedido,
  dataDevolucao,
  vlPedido
) {
  return new Promise(async function (resolve, reject) {
    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      await client.query(
        `INSERT INTO pedido(ID_Atendimento, DT_Entrega_Pedido, entregue, DT_Devolucao_Pedido, devolvido, VL_Pedido, SN_Pago)
         VALUES ($1, $2, 'f', $3, 'f', $4, 'f')`,
        [idAtendimento, dataPedido, dataDevolucao, vlPedido],
        function (erro) {
          if (erro) {
            reject(erro);
            console.log(erro);
            return;
          }

          resolve();

          done();
        }
      );
    });
  });
}

function listarPendentesRepository() {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT Pedido.ID_Atendimento as idAtendimento 
               ,CASE
                  WHEN entregue = 'f'                     THEN DT_Entrega_Pedido
                  WHEN entregue = 't' AND devolvido = 'f' THEN DT_Devolucao_Pedido
                END AS dtPedido
               ,Usuario.ID_Usuario  as idCliente
               ,Usuario.NM_Usuario  as nomeCliente
               ,Usuario.TEL_Usuario as celCliente
               ,entregue
               ,devolvido
         FROM Atendimento
           INNER JOIN Pedido
           ON Pedido.ID_Atendimento = Atendimento.ID_Atendimento
           INNER JOIN Usuario
           ON Usuario.ID_Usuario = Atendimento.ID_Usuario
         WHERE Pedido.devolvido = 'f'`,
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

function listarPendentesClienteRepository(idUsuario) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT Pedido.ID_Atendimento as idAtendimento 
               ,CASE
                  WHEN entregue = 'f'                     THEN DT_Entrega_Pedido
                  WHEN entregue = 't' AND devolvido = 'f' THEN DT_Devolucao_Pedido
                END AS dtPedido
               ,entregue
               ,devolvido
         FROM Atendimento
           INNER JOIN Pedido
           ON Pedido.ID_Atendimento = Atendimento.ID_Atendimento
         WHERE Pedido.devolvido       = 'f'
           AND Atendimento.id_usuario = $1`,
        [idUsuario],
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

function confirmarEntregaRepository(idPedido) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `UPDATE Pedido
         SET entregue = 't'
         WHERE ID_Atendimento = $1`,
        [idPedido],
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

function confirmarDevolucaoRepository(idPedido) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `UPDATE Pedido
         SET devolvido = 't'
         WHERE ID_Atendimento = $1`,
        [idPedido],
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

function listarProdutosRepository(idPedido) {
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

function listarProdutosClienteRepository(idPedido) {
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
               ,PedidosProdutos.DES_Pedido_Pedido                     AS detalhes
           FROM PedidosProdutos
             INNER JOIN Produto
             ON Produto.ID_Produto = PedidosProdutos.ID_Produto
           WHERE PedidosProdutos.ID_Atendimento = $1`,
        [idPedido],
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

module.exports = {
  cadastrar: cadastrarRepository,
  listarPendentes: listarPendentesRepository,
  listarPendentesCliente: listarPendentesClienteRepository,
  confirmarEntrega: confirmarEntregaRepository,
  confirmarDevolucao: confirmarDevolucaoRepository,
  listarProdutos: listarProdutosRepository,
  listarProdutosCliente: listarProdutosClienteRepository,
};
