require('../Logs');

var app = require('../Core');
var deletaPastaRecursivamente = require('../Api/Utils/deletaPastaRecursivamente');
//
//deletaPastaRecursivamente(
//  './Core/Repositories/ImportarDoc2080Repository/uploads'
//);
//deletaPastaRecursivamente(
//  './Core/Repositories/QuebraLinhaDoc2080Repository/uploads'
//);

app.listen(
  3120,
  function () {
    console.log(
      'Exec in: http://localhost:3120'
    );
  }
);

module.exports = {
  deletaPasta: deletaPastaRecursivamente,
};
