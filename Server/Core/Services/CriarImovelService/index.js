var log = require("../../../Logs");
var criarImovelRepository = require("../../Repositories/CriarImovelRepository");

function criarImovelService(req, res) {
  const body = req;
  criarImovelRepository(body)
    .then(() => {
      res.json({ status: 200, message: "ok" });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = criarImovelService;
