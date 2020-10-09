var log = require("../../../Logs");
var listarTipoImovelRepository = require("../../Repositories/ListarTipoImovelRepository");

function listarTipoImovelService(_, res) {
  listarTipoImovelRepository()
    .then((data) => {
      res.json({ status: 200, message: "ok", data: data });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = listarTipoImovelService;
