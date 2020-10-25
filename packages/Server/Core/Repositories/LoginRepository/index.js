const { pool } = require('../../Connection');

const format = require('pg-format');

function loginRepository(cpf, tel, senha) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na procura de dados: ' + err);
        console.log('Erro na procura de dados: ' + err);
        return;
      }

      client.query(
        `SELECT login_atendimento($1, $2, $3)`,
        [cpf, tel, senha],
        function (erro, result) {
          if (erro) {
            reject('Erro na procura de dados: ' + erro);
            console.log('Erro na procura de dados: ' + erro);
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
        reject('Erro na procura de dados: ' + err);
        console.log('Erro na procura de dados: ' + err);
        return;
      }

      await client.query(
        `SELECT cadastrar_usuario($1, $2, $3, $4)`,
        [nome, cpf, senha, tel],
        function (erro, result) {
          if (erro) {
            reject('Erro na procura de dados: ' + erro);
            console.log('Erro na procura de dados: ' + erro);
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
    const enderecosMapeados = enderecos.map(function (element) {
      return [
        element.rua_endereco_usuario,
        element.no_endereco_usuario,
        element.cidade_endereco_usuario,
        element.cep_endereco_usuario,
        id,
      ];
    });

    await pool.connect(async function (err, client, done) {
      if (err) {
        reject('Erro na procura de dados: ' + err);
        console.log('Erro na procura de dados: ' + err);
        return;
      }

      const query = format(
        `INSERT INTO endereco_usuario(rua_endereco_usuario, no_endereco_usuario, cidade_endereco_usuario, cep_endereco_usuario, id_usuario)
                                VALUES %L`,
        enderecosMapeados
      );

      await client.query(query, function (erro) {
        if (erro) {
          reject('Erro na procura de dados: ' + erro);
          console.log('Erro na procura de dados: ' + erro);
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
};
