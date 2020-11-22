const { authorize, authorizeFuncionario } = require('./authorize');

function rotasAutorizadasGet(router, rota, funcao) {
  router.route(rota).get(authorize, funcao);
}

function rotasAutorizadasPost(router, rota, validate, funcao) {
  router.route(rota).post(validate, authorize, funcao);
}

function rotasAutorizadasDelete(router, rota, funcao) {
  router.route(rota).delete(authorize, funcao);
}

function rotasAutorizadasPut(router, rota, validate, funcao) {
  router.route(rota).put(validate, authorize, funcao);
}

function rotasAutorizadasGetFuncionario(router, rota, funcao) {
  router.route(rota).get(authorizeFuncionario, funcao);
}

function rotasAutorizadasPostFuncionario(router, rota, validate, funcao) {
  router.route(rota).post(validate, authorizeFuncionario, funcao);
}

function rotasAutorizadasDeleteFuncionario(router, rota, validate, funcao) {
  router.route(rota).delete(validate, authorizeFuncionario, funcao);
}

module.exports = {
  rotasAutorizadasGet,
  rotasAutorizadasPost,
  rotasAutorizadasDelete,
  rotasAutorizadasPut,
  rotasAutorizadasGetFuncionario,
  rotasAutorizadasPostFuncionario,
  rotasAutorizadasDeleteFuncionario,
};
