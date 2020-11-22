import { injectable } from 'tsyringe';

import pool from 'core/connection';
import IBDConnect from './interface';

interface IClient<T> {
  query: (
    queryBD: string,
    variables: any[],
    resolve: (err: string, result: { rows: T[] }) => void
  ) => void;
}

@injectable()
class BDConnect implements IBDConnect {
  private readonly pool = pool;

  async connectWithDatas<T>(queryBD: string, variables: any[]): Promise<T[]> {
    let data: T[] = [];
    try {
      this.pool.connect((err: Error, client: IClient<T>, done: () => void) => {
        if (err) {
          console.error(err.message);
          throw new Error(err.message);
        }

        client.query(
          queryBD,
          variables,
          (errorReturned, result: { rows: T[] }) => {
            if (errorReturned) {
              throw new Error(err.message);
            }

            data = result.rows;
            done();
          }
        );
      });
    } catch (err) {
      return err;
    }

    return data;
  }

  async connectWithData<T>(queryBD: string, variables: any[]): Promise<T> {
    let data: T;
    try {
      this.pool.connect((err: Error, client: IClient<T>, done: () => void) => {
        if (err) {
          console.error(err.message);
          Error(err.message);
        }

        client.query(
          queryBD,
          variables,
          (errorReturned, result: { rows: T[] }) => {
            if (errorReturned) {
              Error(err.message);
            }

            data = result.rows[0];
            done();
          }
        );
      });
    } catch (err) {
      return err;
    }

    return data;
  }

  async connectWithinData(queryBD: string, variables: any[]): Promise<void> {
    try {
      this.pool.connect(
        (err: Error, client: IClient<any>, done: () => void) => {
          if (err) {
            console.error(err.message);
            Error(err.message);
          }

          client.query(queryBD, variables, (errorReturned) => {
            if (errorReturned) {
              Error(err.message);
            }

            done();
          });
        }
      );
    } catch (err) {
      return err;
    }
  }
}

export default BDConnect;
