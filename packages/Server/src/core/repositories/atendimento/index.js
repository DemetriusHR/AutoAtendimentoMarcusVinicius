const pool = require('../../../shared/connection');

function verificarPendentesRepository(dataInicial, dataFinal) {
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

function atualizarRepository(idAtendimento) {
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

function listarUsuarioRepository(idUsuario) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT Endereco_Usuario.id_endereco_usuario          as idendereco
               ,Endereco_Usuario.rua_endereco_usuario         as rua
               ,Endereco_Usuario.no_endereco_usuario          as numero
               ,Endereco_Usuario.Complemento_Endereco_Usuario as complemento
               ,Endereco_Usuario.cidade_endereco_usuario      as cidade
               ,Endereco_Usuario.CEP_Endereco_Usuario         as cep
         FROM Endereco_Usuario
         WHERE id_usuario = $1`,
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

function editarRepository(
  id,
  rua,
  numero,
  cidade,
  uf,
  cep,
  complemento,
  idUsuario
) {
  return new Promise(async function (resolve, reject) {
    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      await client.query(
        `UPDATE Endereco_Usuario
         SET Rua_Endereco_Usuario         = $2
            ,NO_Endereco_Usuario          = $3
            ,Cidade_Endereco_Usuario      = $4
            ,UF_Endereco                  = $5
            ,CEP_Endereco_Usuario         = $6
            ,Complemento_Endereco_Usuario = $7
            ,ID_Usuario                   = $8
         WHERE ID_Endereco_Usuario  = $1`,
        [id, rua, numero, cidade, uf, cep, complemento, idUsuario],
        function (erro) {
          if (erro) {
            reject(erro);
            console.log(erro);
            return;
          }

          done();
          resolve();
        }
      );
    });
  });
}

module.exports = {
  atualizar: atualizarRepository,
  editar: editarRepository,
  listarUsuario: listarUsuarioRepository,
  verificarPendentes: verificarPendentesRepository,
};
