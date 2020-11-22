const log = require('../../../Logs');
const {
  listarInformacoesUsuarioRepository,
  listarEnderecosUsuarioRepository,
  editarUsuarioRepository,
  editarEnderecoRepository,
  excluirUsuarioRepository,
  excluirEnderecoRepository,
} = require('../../Repositories/UsuarioRepository');

function listarInformacoesUsuarioService(req, res) {
  const idUsuario = parseInt(req.params.id);

  listarInformacoesUsuarioRepository(idUsuario)
    .then((data) => {
      res.json({
        status: 200,
        message: 'ok',
        data,
      });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    });
}

function listarEnderecosUsuarioService(req, res) {
  const idUsuario = parseInt(req.params.id);

  listarEnderecosUsuarioRepository(idUsuario)
    .then((data) => {
      res.json({
        status: 200,
        message: 'ok',
        data,
      });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    });
}

function editarUsuarioService(req, res) {
  const { id, nome, tel, cpf, senha } = req.body;

  editarUsuarioRepository(id, nome, cpf, tel, senha)
    .then(() => {
      res.json({
        status: 200,
        message: 'ok',
      });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    });
}
function editarEnderecoService(req, res) {
  const { id, rua, numero, cidade, uf, cep, complemento, idUsuario } = req.body;

  editarEnderecoRepository(
    id,
    rua,
    numero,
    cidade,
    uf,
    cep,
    complemento,
    idUsuario
  )
    .then(() => {
      res.json({
        status: 200,
        message: 'ok',
      });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    });
}
function excluirEnderecoService(req, res) {
  const idEndereco = parseInt(req.params.id);

  excluirEnderecoRepository(idEndereco)
    .then(() => {
      res.json({
        status: 200,
        message: 'ok',
      });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    });
}
function excluirUsuarioService(req, res) {
  const idUsuario = parseInt(req.params.id);

  excluirUsuarioRepository(idUsuario)
    .then(() => {
      res.json({
        status: 200,
        message: 'ok',
      });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    });
}

module.exports = {
  listarInformacoesUsuarioService,
  listarEnderecosUsuarioService,
  editarUsuarioService,
  editarEnderecoService,
  excluirEnderecoService,
  excluirUsuarioService,
};
