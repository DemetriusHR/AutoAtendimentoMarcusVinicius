interface IBDConnect {
  connectWithDatas<T>(
    queryBD: string,
    variables: any[] | null,
    error: (err: string) => void
  ): Promise<T[]>;
  connectWithData<T>(
    queryBD: string,
    variables: any[] | null,
    error: (err: string) => void
  ): Promise<T>;
  connectWithinData(
    queryBD: string,
    variables: any[] | null,
    error: (err: string) => void
  ): Promise<void>;
}

export default IBDConnect;