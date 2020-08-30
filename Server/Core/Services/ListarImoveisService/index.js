var log = require("../../../Logs");
var listarImoveisRepository = require("../../Repositories/ListarImoveisRepository");

function listarImoveisService(_, res) {
  listarImoveisRepository()
    .then((data) => {
      res.json({ status: 200, message: "ok", data: data });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = listarImoveisService;
