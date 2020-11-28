const log = require('../../logs');

function logErrors(err, req, res, next) {
  console.error(err.stack);
  log.error(err.toString());
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({
      error: err,
    });
    next(err);
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', {
    error: err,
  });
  next(err);
}

module.exports = {
  handler: errorHandler,
  client: clientErrorHandler,
  log: logErrors,
};