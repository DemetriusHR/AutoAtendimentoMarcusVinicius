const pool = require('../../../shared/connection');

function listarInformacoesRepository(idUsuario) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT nm_usuario    AS nome
               ,cpf_usuario   AS cpf
               ,tel_usuario   AS celular
               ,senha_usuario AS senha
         FROM usuario
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

function editarRepository(id, nome, cpf, celular, senha) {
  return new Promise(async function (resolve, reject) {
    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      await client.query(
        `UPDATE usuario
         SET nm_usuario    = $2
            ,cpf_usuario   = $3
            ,tel_usuario   = $4
            ,senha_usuario = $5
         WHERE id_usuario  = $1`,
        [id, nome, cpf, celular, senha],
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

function excluirRepository(id) {
  return new Promise(async function (resolve, reject) {
    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      await client.query(`SELECT excluir_usuario($1)`, [id], function (erro) {
        if (erro) {
          reject(erro);
          console.log(erro);
          return;
        }

        done();
        resolve();
      });
    });
  });
}

module.exports = {
  listarInformacoes: listarInformacoesRepository,
  editar: editarRepository,
  excluir: excluirRepository,
};
