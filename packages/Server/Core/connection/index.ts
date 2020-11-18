import { Pool } from 'pg';

const pool = new Pool({
  host: `${process.env.HOST_DATABASE}`,
  port: `${process.env.PORT_DATABASE}`,
  database: `${process.env.DATA_DATABASE}`,
  user: `${process.env.USER_DATABASE}`,
  password: `${process.env.PASSWORD_DATABASE}`,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;