function ConnectAPI(): string {
  let url = '';
  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:3120/v1';
  }

  if (process.env.NODE_ENV === 'production') {
    url = 'http://localhost:3120/v1';
  }

  return url;
}

export default ConnectAPI;
