var log = require("../../../Logs");
var deletarTipoImovelRepository = require("../../Repositories/DeletarTipoImovelRepository");

function deletarTipoImovelService(req, res) {
  const { id } = req.body;
  deletarTipoImovelRepository(id)
    .then(() => {
      res.json({ status: 200, message: "ok" });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = deletarTipoImovelService;
