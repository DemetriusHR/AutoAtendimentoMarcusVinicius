import { Router } from 'express';
import { autoInjectable, inject, injectable, singleton } from 'tsyringe';

import {
  isAuthenticated,
  isAuthenticatedEmployee,
  isAuthenticatedUser,
} from '../../config/middleware/jwtAuth';

// VALIDATORS

import middlewareValidator from '../../config/middleware/validators';
import atendimentosPendentesValidator from '../../config/middleware/validators/atendimentosPendentes';

import { Identifier } from '../../config/injection/identifiers';

// SERVICES
import IAtendimentoService from '../../config/interfaces/services/atendimento';
import IPedidoService from '../../config/interfaces/services/pedido';
import IProdutoService from '../../config/interfaces/services/produto';
import IUsuarioService from '../../config/interfaces/services/usuario';
import AtendimentoService from '../../core/services/atendimento';
import PedidoService from '../../core/services/pedido';
import ProdutoService from '../../core/services/produto';
import UsuarioService from '../../core/services/usuario';

class ListagemController {
  public router: Router;
  private atendimentoService: IAtendimentoService;
  private pedidoService: IPedidoService;
  private produtoService: IProdutoService;
  private usuarioService: IUsuarioService;

  constructor() {
    this.router = Router();
    this.atendimentoService = new AtendimentoService();
    this.pedidoService = new PedidoService();
    this.produtoService = new ProdutoService();
    this.usuarioService = new UsuarioService();

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
      middlewareValidator(atendimentosPendentesValidator),
      this.atendimentoService.verificar
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
