var bunyan = require('bunyan');

var log = bunyan.createLogger(
  {
    name:
      'api',
    streams: [
      {
        type:
          'rotating-file',
        path:
          __dirname +
          '/api.log',
        period:
          '1d',
        count: 3,
      },
    ],
  }
);

log.info(
  'start'
);

module.exports = log;
