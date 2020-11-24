import { Router } from 'express';
import { autoInjectable, inject, singleton } from 'tsyringe';

import { Identifier } from '../config/injection/identifiers';
import AcoesController from './controllers/acoes';
import ListagemController from './controllers/listagem';

@singleton()
@autoInjectable()
class APIController {
  public router : Router;
  private acoesController: AcoesController;
  private listagemController: ListagemController;

  constructor(
    @inject(Identifier.ACOES_CONTROLLER)
    private _acoesController?: AcoesController,

    @inject(Identifier.LISTAGEM_CONTROLLER)
    private _listagemController?: ListagemController
  ) {
    this.router = Router();
    this.acoesController = _acoesController;
    this.listagemController = _listagemController;

    this.registerRouters();
  }

  registerRouters(): void {
    this.router.use('/acoes', this.acoesController.router);
    this.router.use('/listagens', this.listagemController.router);
  }
}

export default APIController;
