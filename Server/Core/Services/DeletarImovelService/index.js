var log = require("../../../Logs");
var deletarImovelRepository = require("../../Repositories/DeletarImovelRepository");

function deletarImovelService(req, res) {
  const { id } = req.body;
  deletarImovelRepository(id)
    .then(() => {
      res.json({ status: 200, message: "ok" });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = deletarImovelService;
