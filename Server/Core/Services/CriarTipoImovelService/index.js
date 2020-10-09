var log = require("../../../Logs");
var criarTipoImovelRepository = require("../../Repositories/CriarTipoImovelRepository");

function criarTipoImovelService(req, res) {
  const { nome, status } = req.body;
  criarTipoImovelRepository(nome, status)
    .then(() => {
      res.json({ status: 200, message: "ok" });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = criarTipoImovelService;
