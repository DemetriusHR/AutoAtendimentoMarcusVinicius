import { Router } from 'express';
import { autoInjectable, inject, singleton } from 'tsyringe';

import { Identifier } from 'shared/injection/identifiers';
import AcoesController from './controllers/acoes';
import ListagemController from './controllers/listagem';

@singleton()
@autoInjectable()
class APIController {
  public readonly router: Router;
  private acoesController: AcoesController;
  private listagemController: ListagemController;

  constructor(
    @inject(Identifier.ROUTES)
    private _router?: Router,
    @inject(Identifier.ATENDIMENTO_SERVICE)
    private _acoesController?: AcoesController,
    @inject(Identifier.HORARIO_SERVICE)
    private _listagemController?: ListagemController
  ) {
    this.acoesController = _acoesController;
    this.listagemController = _listagemController;
  }

  registerRouters() {
    this.router.use('/acoes', this.acoesController.router);
    this.router.use('/listagens', this.listagemController.router);
  }
}

export default APIController;
