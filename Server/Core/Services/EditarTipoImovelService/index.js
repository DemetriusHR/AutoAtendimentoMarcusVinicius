var log = require("../../../Logs");
var editarTipoImovelRepository = require("../../Repositories/EditarTipoImovelRepository");

function editarTipoImovelService(req, res) {
  const { nome, status, id } = req.body;
  editarTipoImovelRepository(nome, status, id)
    .then(() => {
      res.json({ status: 200, message: "ok" });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = editarTipoImovelService;
