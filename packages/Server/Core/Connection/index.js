const {
  Pool,
} = require('pg');

const pool = new Pool(
  {
    host:
      'localhost',
    port: 5432,
    database:
      'marcusVinicius',
    user:
      'postgres',
    password:
      '#Dimer123',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }
);

module.exports = {
  pool,
};
