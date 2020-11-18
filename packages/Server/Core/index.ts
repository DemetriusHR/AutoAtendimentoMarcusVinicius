import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import methodOverride from 'method-override';
import { autoInjectable, inject, singleton } from 'tsyringe';

import APIController from 'api';
import errors from 'api/middleware/errors';
import { Identifier } from 'shared/injection/identifiers';
import log from 'shared/logs';

@singleton()
@autoInjectable()
class Server {
  private app = express();
  private rotas: Router;

  constructor(
    @inject(Identifier.API_CONTROLLER)
    private _apiController?: APIController
  ) {
    this.rotas = _apiController.router;

    this.initializeServer();
  }

  initializeServer() {
    this.app.use(
      bodyParser.json({
        limit: '150mb',
      })
    );

    this.app.use(
      bodyParser.urlencoded({
        limit: '150mb',
        extended: true,
      })
    );

    this.app.use(compression());

    this.app.use(methodOverride());
    this.app.use(errors.log);
    this.app.use(errors.client);
    this.app.use(errors.handler);

    this.app.use(
      cors({
        origin: '*',
      })
    );

    this.app.use('/v1', this.rotas);

    this.app.use(helmet());

    this.app.use((x, y, next) => {
      log.error(createError(404).toString());
      next(createError(404));
    });

    dotenv.config();

    this.app.listen(3120, () => {
      console.log('Exec in: http://localhost:3120');
    });
  }
}

export default Server;
