const log = require('../../logs');

function responseSucess(res, data = []) {
  res.json({
    status: 200,
    message: 'ok',
    data,
  });
}

function responseErrorServer(res, error) {
  log.error(`500: ${error.toString()}`);
  res.status(500).json({
    status: 500,
    message: error.toString(),
  });
}

function responseErrorClient(res, error) {
  log.error(`400: ${error}`);
  res.status(400).json({
    status: 400,
    message: error,
  });
}

function responseErrorAuth(res) {
  log.error('401: Não Autorizado!');
  res.status(401).json({
    status: 401,
    message: 'Não Autorizado!',
  });
}

module.exports = {
  sucess: responseSucess,
  errorServer: responseErrorServer,
  errorAuth: responseErrorAuth,
  errorClient: responseErrorClient,
};
