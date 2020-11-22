import express from 'express';
import validate from 'express-validation';
import { autoInjectable, inject, singleton } from 'tsyringe';

import {
  rotasAutorizadasGet,
  rotasAutorizadasGetFuncionario,
  rotasAutorizadasPostFuncionario,
} from '../Utils/rotasAutorizadas';

// VALIDATORS

import atendimentosPendentesValidator from 'core/validators/AtendimentosPendentesValidator';

import { Identifier } from 'shared/injection/identifiers';

// SERVICES
import IAtendimentoService from 'shared/interfaces/services/atendimento';
import IPedidoService from 'shared/interfaces/services/pedido';
import IProdutoService from 'shared/interfaces/services/produto';
import IUsuarioService from 'shared/interfaces/services/usuario';

@singleton()
@autoInjectable()
class ListagemController {
  public router = express.Router();
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
    this.atendimentoService = _atendimentoService;
    this.pedidoService = _pedidoService;
    this.produtoService = _produtoService;
    this.usuarioService = _usuarioService;

    this.constructorRoutes();
  }

  constructorRoutes() {
    rotasAutorizadasGet(
      this.router,
      '/usuario/:id',
      this.usuarioService.listarInformacoes
    );
    rotasAutorizadasPostFuncionario(
      this.router,
      '/atendimentos-pendentes',
      validate(atendimentosPendentesValidator),
      this.atendimentoService.verificar
    );
    rotasAutorizadasGetFuncionario(
      this.router,
      '/produtos',
      this.produtoService.listarTodos
    );
    rotasAutorizadasGetFuncionario(
      this.router,
      '/produto/:id',
      this.produtoService.listarEspecifico
    );
    rotasAutorizadasGetFuncionario(
      this.router,
      '/pedidos-pendentes',
      this.pedidoService.listarPendentes
    );
    rotasAutorizadasGet(
      this.router,
      '/pedidos-pendentes/:id',
      this.pedidoService.listarPendentesCliente
    );
    rotasAutorizadasGet(
      this.router,
      '/pedido-pendente/:id/produtos',
      this.produtoService.listarPedidoCliente
    );
    rotasAutorizadasGetFuncionario(
      this.router,
      '/pedido-pendente-funcionario/:id/produtos',
      this.produtoService.listarPedido
    );
    rotasAutorizadasGet(
      this.router,
      '/usuario/:id/enderecos',
      this.usuarioService.listarEnderecos
    );
  }
}

export default ListagemController;
