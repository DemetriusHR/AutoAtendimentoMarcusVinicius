const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "marcusVinicius",
  user: "postgres",
  password: "#Dimer123",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

function connectionBD(query, resolve, reject, args) {
  pool.connect(function (err, client, done) {
    if (err) {
      reject("Erro na procura de dados: " + err);
      console.log("Erro na procura de dados: " + err);
      return;
    }

    client.query(query, args, function (erro) {
      if (erro) {
        reject("Erro na procura de dados: " + erro);
        console.log("Erro na procura de dados: " + erro);
        return;
      }

      done();
      resolve();
    });
  });
}

module.exports = { pool, connectionBD };
