import { Router } from 'express';
import { validate } from 'express-validation';
import { autoInjectable, inject, singleton } from 'tsyringe';

import {
  isAuthenticated,
  isAuthenticatedEmployee,
  isAuthenticatedUser,
} from '../../config/middleware/jwtAuth';

// VALIDATORS

import atendimentosPendentesValidator from '../../config/middleware/validators/atendimentosPendentes';

import { Identifier } from '../../config/injection/identifiers';

// SERVICES
import IAtendimentoService from '../../config/interfaces/services/atendimento';
import IPedidoService from '../../config/interfaces/services/pedido';
import IProdutoService from '../../config/interfaces/services/produto';
import IUsuarioService from '../../config/interfaces/services/usuario';

@singleton()
@autoInjectable()
class ListagemController {
  public router: Router;
  private atendimentoService: IAtendimentoService;
  private pedidoService: IPedidoService;
  private produtoService: IProdutoService;
  private usuarioService: IUsuarioService;

  constructor(
    @inject(Identifier.ATENDIMENTO_SERVICE)
    private _atendimentoService?: IAtendimentoService,

    @inject(Identifier.PEDIDO_SERVICE)
    private _pedidoService?: IPedidoService,

    @inject(Identifier.PRODUTO_REPOSITORY)
    private _produtoService?: IProdutoService,

    @inject(Identifier.USUARIO_SERVICE)
    private _usuarioService?: IUsuarioService
  ) {
    this.router = Router();
    this.atendimentoService = _atendimentoService;
    this.pedidoService = _pedidoService;
    this.produtoService = _produtoService;
    this.usuarioService = _usuarioService;

    this.constructorRoutes();
  }

  constructorRoutes(): void {
    this.router.get(
      '/usuario/:id',
      isAuthenticated,
      this.usuarioService.listarInformacoes
    );
    this.router.post(
      '/atendimentos-pendentes',
      isAuthenticatedEmployee,
      validate(atendimentosPendentesValidator),
      this.usuarioService.listarInformacoes
    );
    this.router.get(
      '/produtos',
      isAuthenticatedEmployee,
      this.produtoService.listarTodos
    );
    this.router.get(
      '/produto/:id',
      isAuthenticatedEmployee,
      this.produtoService.listarTodos
    );
    this.router.get(
      '/pedidos-pendentes',
      isAuthenticatedEmployee,
      this.pedidoService.listarPendentes
    );
    this.router.get(
      '/pedidos-pendentes/:id',
      isAuthenticatedEmployee,
      this.pedidoService.listarPendentesCliente
    );
    this.router.get(
      '/pedido-pendente/:id/produtos',
      isAuthenticatedUser,
      this.produtoService.listarPedidoCliente
    );
    this.router.get(
      '/pedido-pendente-funcionario/:id/produtos',
      isAuthenticatedEmployee,
      this.produtoService.listarPedido
    );
    this.router.get(
      '/usuario/:id/enderecos',
      isAuthenticated,
      this.usuarioService.listarEnderecos
    );
  }
}

export default ListagemController;
