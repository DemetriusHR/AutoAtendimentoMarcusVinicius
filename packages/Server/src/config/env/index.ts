interface IConfig {
  port: string | number;
  database: {
    HOST_DATABASE: string;
    PORT_DATABASE: number;
    DATA_DATABASE: string;
    USER_DATABASE: string;
    PASSWORD_DATABASE: string;
  };
  secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    HOST_DATABASE: process.env.HOST_DATABASE || 'host',
    PORT_DATABASE: parseInt(process.env.PORT_DATABASE, 10) || 5000,
    DATA_DATABASE: process.env.DATA_DATABASE || 'database',
    USER_DATABASE: process.env.USER_DATABASE || 'user',
    PASSWORD_DATABASE: process.env.PASSWORD_DATABASE || 'password',
  },
  secret: process.env.SECRET_KEY_JWT || '@TESTE',
};

const production: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    HOST_DATABASE: process.env.HOST_DATABASE || 'host',
    PORT_DATABASE: parseInt(process.env.PORT_DATABASE, 10) || 5000,
    DATA_DATABASE: process.env.DATA_DATABASE || 'database',
    USER_DATABASE: process.env.USER_DATABASE || 'user',
    PASSWORD_DATABASE: process.env.PASSWORD_DATABASE || 'password',
  },
  secret: process.env.SECRET_KEY_JWT || '@TESTE',
};

const test: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    HOST_DATABASE: process.env.HOST_DATABASE || 'host',
    PORT_DATABASE: parseInt(process.env.PORT_DATABASE, 10) || 5000,
    DATA_DATABASE: process.env.DATA_DATABASE || 'database',
    USER_DATABASE: process.env.USER_DATABASE || 'user',
    PASSWORD_DATABASE: process.env.PASSWORD_DATABASE || 'password',
  },
  secret: process.env.SECRET_KEY_JWT || '@TESTE',
};

const config: {
  [name: string]: IConfig;
} = {
  test,
  development,
  production,
};

export default config[NODE_ENV];
