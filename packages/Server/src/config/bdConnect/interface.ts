interface IBDConnect {
  connectWithDatas<T>(queryBD: string, variables: any[] | null): Promise<T[]>;
  connectWithData<T>(queryBD: string, variables: any[] | null): Promise<T>;
  connectWithinData(queryBD: string, variables: any[] | null): Promise<void>;
}

export default IBDConnect;
