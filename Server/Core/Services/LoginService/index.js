var log = require("../../../Logs");
var loginRepository = require("../../Repositories/LoginRepository");

function loginService(req, res) {
  const { login, senha } = req.body;
  loginRepository(login, senha)
    .then((loginVerify) => {
      res.json({ status: 200, message: "ok", data: loginVerify });
    })
    .catch((e) => {
      log.error(e.toString());
      res.status(500).json({ status: 500, message: e.toString() });
    });
}

module.exports = loginService;
