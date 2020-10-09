var log = require("../../../Logs");
var editarImovelRepository = require("../../Repositories/EditarImovelRepository");

function editarImovelService(req, res) {
  const { imovel } = req.body;
  editarImovelRepository(imovel)
    .then(() => {
      res.json({ status: 200, message: "ok" });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = editarImovelService;
