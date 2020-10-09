var log = require("../../../Logs");
var editarLoginRepository = require("../../Repositories/EditarLoginRepository");

function editarLoginService(req, res) {
  const body = req;
  editarLoginRepository(body)
    .then(() => {
      res.json({ status: 200, message: "ok" });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = editarLoginService;
