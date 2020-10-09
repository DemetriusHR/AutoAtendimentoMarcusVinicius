var log = require("../../../Logs");
var criarLoginRepository = require("../../Repositories/CriarLoginRepository");

function criarLoginService(req, res) {
  const { nome, login, senha, situacao } = req.body;
  criarLoginRepository(nome, login, senha, situacao)
    .then(() => {
      res.json({ status: 200, message: "ok" });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = criarLoginService;
