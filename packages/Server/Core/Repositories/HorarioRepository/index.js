const { pool } = require('../../Connection');

function verificaHorarioRepository(data) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT 1
         FROM Atendimento
         WHERE DT_Atendimento = $1`,
        [data],
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
        reject(err);
        console.log(err);
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

function atualizaAtendimentoRepository(idAtendimento) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `UPDATE Atendimento
         SET Atendimento_Realizado = 't'
         WHERE ID_Atendimento = $1`,
        [idAtendimento],
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

function cadastrarPedidoRepository(
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

function listaPedidosPendentesRepository() {
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

function listaPedidosPendentesClienteRepository(idUsuario) {
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

function pedidosPendentesConfirmaEntregaRepository(idPedido) {
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


function pedidosPendentesConfirmaDevolucaoRepository(idPedido) {
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

module.exports = {
  verificaHorarioRepository,
  marcarHorarioRepository,
  verificaAtendimentosPendentesRepository,
  atualizaAtendimentoRepository,
  cadastrarPedidoRepository,
  listaPedidosPendentesClienteRepository,
  listaPedidosPendentesRepository,
  pedidosPendentesConfirmaEntregaRepository,
  pedidosPendentesConfirmaDevolucaoRepository,
};
