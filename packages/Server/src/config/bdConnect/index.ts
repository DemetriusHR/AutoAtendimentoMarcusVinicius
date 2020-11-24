import { Pool } from 'pg';

import pool from '../connection/connection';
import IBDConnect from './interface';

class BDConnect implements IBDConnect {
  private readonly pool: Pool = pool;

  async connectWithDatas<T>(queryBD: string, variables: any[]): Promise<T[]> {
    let data: T[] = [];

    return new Promise<T[]>((res, rej): void => {
      this.pool.connect((err, client, done): void => {
        if (err) {
          console.error(err.toString());
          rej(err.toString());
        }

        client.query<T>(queryBD, variables, (errorReturned, result): void => {
          if (errorReturned) {
            console.error(errorReturned.toString());
            rej(errorReturned);
          }

          console.log(result);

          data = result.rows;
          res(data);
          done();
        });
      });
    });
  }

  async connectWithData<T>(queryBD: string, variables: any[]): Promise<T> {
    let data: T;

    return new Promise<T>((res, rej): void => {
      this.pool.connect((err, client, done): void => {
        if (err) {
          console.error(err.toString());
          rej(err.toString());
        }

        client.query<T>(queryBD, variables, (errorReturned, result): void => {
          if (errorReturned) {
            console.error(errorReturned.toString());
            rej(errorReturned);
          }

          console.log(result);

          data = result.rows[0];
          res(data);
          done();
        });
      });
    });
  }

  async connectWithinData(queryBD: string, variables: any[]): Promise<void> {
    return new Promise((res, rej): void => {
      this.pool.connect((err, client, done): void => {
        if (err) {
          console.error(err.toString());
          rej(err.toString());
        }

        client.query(queryBD, variables, (errorReturned, result): void => {
          if (errorReturned) {
            console.error(errorReturned.toString());
            rej(errorReturned);
          }
          res();
          done();
        });
      });
    });
  }
}

export default BDConnect;
