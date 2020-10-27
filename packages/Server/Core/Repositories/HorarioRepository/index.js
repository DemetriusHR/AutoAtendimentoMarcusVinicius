const { pool } = require('../../Connection');

const format = require('pg-format');

function verificaHorarioRepository(data) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na procura de dados: ' + err);
        console.log('Erro na procura de dados: ' + err);
        return;
      }

      client.query(
        `SELECT 1
         FROM Atendimento
         WHERE DT_Atendimento = $1`,
        [data],
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

function marcarHorarioRepository(data, idUsuario) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na marcação de horário: ' + err);
        console.log('Erro na marcação de horário: ' + err);
        return;
      }

      client.query(
        `CALL cadastrar_atendimento($1, $2)`,
        [data, idUsuario],
        function (erro) {
          if (erro) {
            reject('Erro na marcação de horário: ' + erro);
            console.log('Erro na marcação de horário: ' + erro);
            return;
          }

          resolve();
          done();
        }
      );
    });
  });
}

function verificaAtendimentosPendentesRepository(dataInicial, dataFinal) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na verificação de atendimentos pendentes: ' + err);
        console.log('Erro na verificação de atendimentos pendentes: ' + err);
        return;
      }

      client.query(
        `SELECT ID_Atendimento     as idAtendimento
               ,DT_Atendimento     as dataAtendimento
               ,Usuario.ID_Usuario as idCliente
               ,Usuario.NM_Usuario as nomeCliente
        FROM Atendimento
          INNER JOIN Usuario
          ON Usuario.id_usuario = Atendimento.id_usuario
        WHERE DT_Atendimento        >= $1
          AND DT_Atendimento        <= $2
          AND Atendimento_Realizado = 'f'`,
        [dataInicial, dataFinal],
        function (erro, result) {
          if (erro) {
            reject('Erro na verificação de atendimentos pendentes: ' + erro);
            console.log('Erro na verificação de atendimentos pendentes: ' + erro);
            return;
          }

          resolve(result.rows);
          done();
        }
      );
    });
  });
}

function atualizaAtendimentoRepository(idAtendimento) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na atualização do atendimento: ' + err);
        console.log('Erro na atualização do atendimento: ' + err);
        return;
      }

      client.query(
        `UPDATE Atendimento
         SET Atendimento_Realizado = 't'
         WHERE ID_Atendimento = $1`,
        [idAtendimento],
        function (erro) {
          if (erro) {
            reject('Erro na atualização do atendimento: ' + erro);
            console.log('Erro na atualização do atendimento: ' + erro);
            return;
          }

          resolve();
          done();
        }
      );
    });
  });
}

function cadastrarPedidoRepository(
  idAtendimento,
  dataPedido,
  dataDevolucao,
  vlPedido
) {
  return new Promise(async function (resolve, reject) {
    await pool.connect(async function (err, client, done) {
      if (err) {
        reject('Erro na inserção do pedido: ' + err);
        console.log('Erro na inserção do pedido: ' + err);
        return;
      }

      await client.query(
        `INSERT INTO pedido(ID_Atendimento, DT_Entrega_Pedido, entregue, DT_Devolucao_Pedido, devolvido, VL_Pedido, SN_Pago)
         VALUES ($1, $2, 'f', $3, 'f', $4, 'f')`,
        [idAtendimento, dataPedido, dataDevolucao, vlPedido],
        function (erro) {
          if (erro) {
            reject('Erro na inserção do pedido: ' + erro);
            console.log('Erro na inserção do pedido: ' + erro);
            return;
          }

          resolve();

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
        reject('Erro no cadastro de produtos no pedido: ' + err);
        console.log('Erro no cadastro de produtos no pedido: ' + err);
        return;
      }

      const query = format(
        `INSERT INTO PedidosProdutos(ID_Atendimento, ID_Produto, DES_Pedido_Pedido)
         VALUES %L`,
        produtosMapeados
      );

      await client.query(query, function (erro) {
        if (erro) {
          reject('Erro no cadastro de produtos no pedido: ' + erro);
          console.log('Erro no cadastro de produtos no pedido: ' + erro);
          return;
        }

        resolve();

        done();
      });
    });
  });
}

function listaPedidosPendentesClienteRepository(idUsuario) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na listagem de pedidos pendentes: ' + err);
        console.log('Erro na listagem de pedidos pendentes: ' + err);
        return;
      }

      client.query(
        `SELECT CASE
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
            reject('Erro na listagem de pedidos pendentes: ' + erro);
            console.log('Erro na listagem de pedidos pendentes: ' + erro);
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
  verificaHorarioRepository,
  marcarHorarioRepository,
  verificaAtendimentosPendentesRepository,
  atualizaAtendimentoRepository,
  cadastrarProdutosPedidoRepository,
  cadastrarPedidoRepository,
  listaPedidosPendentesClienteRepository,
};
