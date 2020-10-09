var bunyan = require("bunyan");

var log = bunyan.createLogger({
  name: "apiSAGLoad",
  streams: [
    {
      type: "rotating-file",
      path: __dirname + "/apiSAGLoad.log",
      period: "1d",
      count: 3
    }
  ]
});

log.info("start");

module.exports = log;
