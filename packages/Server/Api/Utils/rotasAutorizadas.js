const authorize = require('./authorize');

function rotasAutorizadasGet(
  router,
  rota,
  funcao
) {
  router
    .route(
      rota
    )
    .get(
      authorize,
      funcao
    );
}

module.exports = {
  rotasAutorizadasGet,
};
