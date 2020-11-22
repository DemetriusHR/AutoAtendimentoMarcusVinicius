const { pool } = require('../../Connection');

function listarInformacoesUsuarioRepository(idUsuario) {
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

function listarEnderecosUsuarioRepository(idUsuario) {
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

function editarUsuarioRepository(id, nome, cpf, celular, senha) {
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

function editarEnderecoRepository(
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

function excluirUsuarioRepository(id) {
  return new Promise(async function (resolve, reject) {
    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      await client.query(
        `SELECT excluir_usuario($1)`,
        [id],
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

function excluirEnderecoRepository(id) {
  return new Promise(async function (resolve, reject) {
    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      await client.query(
        `DELETE
        FROM Endereco_Usuario
         WHERE ID_Endereco_Usuario  = $1`,
        [id],
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
  listarInformacoesUsuarioRepository,
  listarEnderecosUsuarioRepository,
  editarUsuarioRepository,
  editarEnderecoRepository,
  excluirUsuarioRepository,
  excluirEnderecoRepository,
};
