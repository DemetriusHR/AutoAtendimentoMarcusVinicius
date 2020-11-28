const pool = require('../../../shared/connection');

const format = require('pg-format');

function cadastrarUsuarioRepository(id, enderecos = [{}]) {
  return new Promise(async function (resolve, reject) {
    const enderecosMapeados = enderecos.map(function (endereco) {
      return [
        endereco.rua_endereco_usuario,
        endereco.no_endereco_usuario,
        endereco.cidade_endereco_usuario,
        'SP',
        endereco.cep_endereco_usuario,
        endereco.complemento_endereco_usuario,
        id,
      ];
    });

    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      const query = format(
        `INSERT INTO endereco_usuario(rua_endereco_usuario
                                       ,no_endereco_usuario
                                       ,cidade_endereco_usuario
                                       ,uf_endereco
                                       ,cep_endereco_usuario
                                       ,complemento_endereco_usuario
                                       ,id_usuario)
           VALUES %L`,
        enderecosMapeados
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

function cadastrarEspecificoUsuarioRepository(
  idUsuario,
  rua,
  numero,
  cidade,
  cep,
  complemento
) {
  return new Promise(async function (resolve, reject) {
    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      const variables = [idUsuario, rua, numero, cidade, cep, complemento];

      const query = `SELECT cadastrar_endereco_usuario($1, $2, $3, $4, $5, $6)`;

      await client.query(query, variables, function (erro) {
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

function excluirRepository(id) {
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

module.exports = {
  cadastrarUsuario: cadastrarUsuarioRepository,
  cadastrarEspecificoUsuario: cadastrarEspecificoUsuarioRepository,
  excluir: excluirRepository,
  editar: editarRepository,
  listarUsuario: listarUsuarioRepository,
};
