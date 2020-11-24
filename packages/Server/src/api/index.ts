import { Router } from 'express';

import AcoesController from './controllers/acoes';
import ListagemController from './controllers/listagem';

class APIController {
  public router : Router;
  private acoesController: AcoesController;
  private listagemController: ListagemController;

  constructor() {
    this.router = Router();
    this.acoesController = new AcoesController();
    this.listagemController = new ListagemController();

    this.registerRouters();
  }

  registerRouters(): void {
    this.router.use('/acoes', this.acoesController.router);
    this.router.use('/listagens', this.listagemController.router);
  }
}

export default APIController;
