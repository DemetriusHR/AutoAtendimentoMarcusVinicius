import { Router } from 'express';
import validate from 'express-validation';
import { autoInjectable, inject, singleton } from 'tsyringe';

import {
  rotasAutorizadasDeleteFuncionario,
  rotasAutorizadasPost,
  rotasAutorizadasPostFuncionario,
} from '../Utils/rotasAutorizadas';

// VALIDATORS

import cadastrarValidator from 'core/validators/CadastrarValidator';
import cancelarAtendimentoValidator from 'core/validators/CancelaAtendimentoValidator';
import confirmarDevolucaoPedidoValidator from 'core/validators/ConfirmaDevolucaoPedidoValidator';
import confirmarEntregaPedidoValidator from 'core/validators/ConfirmaEntregaPedidoValidator';
import confirmarAtendimentoValidator from 'core/validators/ConfirmarAtendimentoValidator';
import loginValidator from 'core/validators/LoginValidator';
import marcarHorarioValidator from 'core/validators/MarcarHorarioValidator';
import verificarAtendimentoValidator from 'core/validators/VerificaAtendimentoValidator';

import { Identifier } from 'shared/injection/identifiers';

// SERVICES
import IAtendimentoService from 'shared/interfaces/services/atendimento';
import IHorarioService from 'shared/interfaces/services/horario';
import ILoginService from 'shared/interfaces/services/login';
import IPedidoService from 'shared/interfaces/services/pedido';

@singleton()
@autoInjectable()
class AcoesController {
  public router: Router;
  private atendimentoService: IAtendimentoService;
  private horarioService: IHorarioService;
  private loginService: ILoginService;
  private pedidoService: IPedidoService;

  constructor(
    @inject(Identifier.ATENDIMENTO_SERVICE)
    private _atendimentoService?: IAtendimentoService,

    @inject(Identifier.HORARIO_SERVICE)
    private _horarioService?: IHorarioService,

    @inject(Identifier.LOGIN_SERVICE)
    private _loginService?: ILoginService,

    @inject(Identifier.PEDIDO_SERVICE)
    private _pedidoService?: IPedidoService,
  ) {
    this.router = Router();
    this.atendimentoService = _atendimentoService;
    this.horarioService = _horarioService;
    this.loginService = _loginService;
    this.pedidoService = _pedidoService;

    this.constructorRoutes();
  }

  constructorRoutes() {
    this.router
      .route('/login')
      .post(validate(loginValidator), this.loginService.login);
    this.router
      .route('/cadastrar')
      .post(validate(cadastrarValidator), this.loginService.cadastrar);
    this.router
      .route('/verifica-horario')
      .post(
        validate(verificarAtendimentoValidator),
        this.horarioService.verificar
      );
    rotasAutorizadasPost(
      this.router,
      '/marcar-horario',
      validate(marcarHorarioValidator),
      this.horarioService.marcar
    );
    rotasAutorizadasDeleteFuncionario(
      this.router,
      '/cancela-atendimento',
      validate(cancelarAtendimentoValidator),
      this.atendimentoService.cancelar
    );
    rotasAutorizadasPost(
      this.router,
      '/confirmar-atendimento',
      validate(confirmarAtendimentoValidator),
      this.atendimentoService.confirmar
    );
    rotasAutorizadasPostFuncionario(
      this.router,
      '/pedido-pendente/confirma-entrega',
      validate(confirmarEntregaPedidoValidator),
      this.pedidoService.confirmarEntrega
    );
    rotasAutorizadasPostFuncionario(
      this.router,
      '/pedido-pendente/confirma-entrega',
      validate(confirmarEntregaPedidoValidator),
      this.pedidoService.confirmarEntrega
    );
    rotasAutorizadasPostFuncionario(
      this.router,
      '/pedido-pendente/confirma-devolucao',
      validate(confirmarDevolucaoPedidoValidator),
      this.pedidoService.confirmarDevolucao
    );
  }
}

export default AcoesController;
