const authorize = require('./authorize');

function rotasAutorizadasGet(router, rota, funcao) {
  router.route(rota).get(authorize, funcao);
}

function rotasAutorizadasPost(router, rota, validate, funcao) {
  router.route(rota).post(validate, authorize, funcao);
}

module.exports = {
  rotasAutorizadasGet,
  rotasAutorizadasPost,
};
