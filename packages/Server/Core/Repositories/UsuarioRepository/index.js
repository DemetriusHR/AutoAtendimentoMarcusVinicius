const { pool } = require('../../Connection');

function listarInformacoesUsuarioRepository(idUsuario) {
  return new Promise(async function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        reject('Erro na listagem de informações do usuário: ' + err);
        console.log('Erro na listagem de informações do usuário: ' + err);
        return;
      }

      client.query(
        `SELECT nm_usuario  AS nome
               ,cpf_usuario AS cpf
               ,tel_usuario AS celular
         FROM usuario
         WHERE id_usuario = $1`,
        [idUsuario],
        function (erro, result) {
          if (erro) {
            reject('Erro na listagem de informações do usuário: ' + erro);
            console.log('Erro na listagem de informações do usuário: ' + erro);
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
        reject('Erro na listagem de endereços: ' + err);
        console.log('Erro na listagem de endereços: ' + err);
        return;
      }

      client.query(
        `SELECT Endereco_Usuario.id_endereco_usuario as idendereco
               ,concat(Endereco_Usuario.rua_endereco_usuario, ', ', Endereco_Usuario.no_endereco_usuario, ' ', Endereco_Usuario.cidade_endereco_usuario, '-', Endereco_Usuario.uf_endereco) as endereco
         FROM Endereco_Usuario
         WHERE id_usuario = $1`,
        [idUsuario],
        function (erro, result) {
          if (erro) {
            reject('Erro na listagem de endereços: ' + erro);
            console.log('Erro na listagem de endereços: ' + erro);
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
  listarInformacoesUsuarioRepository,
  listarEnderecosUsuarioRepository,
};
