import * as dotenv from 'dotenv';
import * as express from 'express';

import * as Middleware from '../middleware/middleware';
import APIController from '../../api';

class Server {
  /**
   * @constant {express.Application}
   */
  public app: express.Application = express();
  private rotas: express.Router;

  constructor() {
    this.rotas = new APIController().router;

    this.initializeServer();
  }

  initializeServer(): void {
    dotenv.config();

    /**
     * @constructs express.Application Middleware
     */
    Middleware.configure(this.app);

    /**
     * @constructs express.Application Routes
     */
    this.app.use('/v1', this.rotas);

    /**
     * @constructs express.Application Error Handler
     */
    Middleware.initErrorHandler(this.app);

    /**
     * sets port 3000 to default or unless otherwise specified in the environment
     */
    this.app.set('port', process.env.PORT || 3000);

    /**
     * sets secret to 'superSecret', otherwise specified in the environment
     */
    this.app.set('secret', process.env.SECRET || 'superSecret');
  }
}
/**
 * @exports {express.Application}
 */
export default Server;
