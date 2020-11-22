const { pool } = require('../../Connection');

const format = require('pg-format');

function loginRepository(cpf, tel, senha) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      client.query(
        `SELECT login_atendimento($1, $2, $3)`,
        [cpf, tel, senha],
        function (erro, result) {
          if (erro) {
            reject(erro);
            console.log(erro);
            return;
          }

          const { login_atendimento } = result.rows[0];

          const idUsuario = parseInt(
            login_atendimento.substring(1, login_atendimento.indexOf(','))
          );

          const funcionario =
            login_atendimento.substring(
              login_atendimento.indexOf(',') + 1,
              login_atendimento.indexOf(')')
            ) === 't';

          resolve({
            idUsuario,
            funcionario,
          });
          done();
        }
      );
    });
  });
}

function cadastrarUsuarioRepository(nome, cpf, senha, tel) {
  return new Promise(async function (resolve, reject) {
    let idUsuario = 0;

    await pool.connect(async function (err, client, done) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      await client.query(
        `SELECT cadastrar_usuario($1, $2, $3, $4)`,
        [nome, cpf, senha, tel],
        function (erro, result) {
          if (erro) {
            reject(erro);
            console.log(erro);
            return;
          }

          idUsuario = result.rows[0].cadastrar_usuario;

          resolve({
            idUsuario,
          });

          done();
        }
      );
    });
  });
}

function cadastrarEnderecosUsuarioRepository(id, enderecos = [{}]) {
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

function cadastrarEnderecoUsuarioRepository(
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

module.exports = {
  loginRepository,
  cadastrarUsuarioRepository,
  cadastrarEnderecosUsuarioRepository,
  cadastrarEnderecoUsuarioRepository,
};
