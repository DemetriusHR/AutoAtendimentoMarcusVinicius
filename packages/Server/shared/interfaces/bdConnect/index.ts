import { Pool } from 'pg';
import IBDConnect from './interface';

interface IClient<T> {
  query: (
    queryBD: string,
    variables: any[],
    resolve: (err: string, result: { rows: T[] }) => void,
  ) => void;
}

class BDConnect implements IBDConnect {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async connectWithDatas<T>(
    queryBD: string,
    variables: any[],
    error: (err: string) => void
  ): Promise<T[]> {
    let data: T[] = [];
    await this.pool.connect((err: string, client: IClient<T>, done: () => void) => {
      if (err) {
        console.error(err);
        error(err);
        return;
      }

      client.query(queryBD, variables, (errorReturned, result: { rows: T[] }) => {
        if (errorReturned) {
          error(errorReturned);
        }

        data = result.rows;
        done();
      });
    });

    return data;
  }

  async connectWithData<T>(
    queryBD: string,
    variables: any[],
    error: (err: string) => void
  ): Promise<T> {
    let data: T;
    this.pool.connect((err: string, client: IClient<T>, done: () => void) => {
      if (err) {
        console.error(err);
        error(err);
        return;
      }

      client.query(queryBD, variables, (errorReturned, result: { rows: T[] }) => {
        if (errorReturned) {
          error(errorReturned);
        }

        data = result.rows[0];
        done();
      });
    });

    return data;
  }

  async connectWithinData(
    queryBD: string,
    variables: any[],
    error: (err: string) => void
  ): Promise<void> {
    await this.pool.connect((err: string, client: IClient<any>, done: () => void) => {
      if (err) {
        console.error(err);
        error(err);
        return;
      }

      client.query(queryBD, variables, (errorReturned) => {
        if (errorReturned) {
          error(errorReturned);
        }

        done();
      });
    });

    return null;
  }
}

export default BDConnect;