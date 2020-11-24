import { Pool } from 'pg';
import env from '../env';

const pool: Pool = new Pool({
  host: env.database.HOST_DATABASE,
  port: env.database.PORT_DATABASE,
  database: env.database.DATA_DATABASE,
  user: env.database.USER_DATABASE,
  password: env.database.PASSWORD_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
