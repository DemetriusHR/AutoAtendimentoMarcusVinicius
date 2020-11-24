import { Router } from 'express';
import { validate } from 'express-validation';
import { autoInjectable, inject, singleton } from 'tsyringe';

import {
  isAuthenticatedEmployee,
  isAuthenticatedUser,
} from '../../config/middleware/jwtAuth';

// VALIDATORS

import cadastrarValidator from '../../config/middleware/validators/cadastrar';
import cancelarAtendimentoValidator from '../../config/middleware/validators/cancelarAtendimento';
import confirmarDevolucaoPedidoValidator from '../../config/middleware/validators/confirmarDevolucaoPedido';
import confirmarEntregaPedidoValidator from '../../config/middleware/validators/confirmarEntregaPedido';
import confirmarAtendimentoValidator from '../../config/middleware/validators/confirmarAtendimento';
import loginValidator from '../../config/middleware/validators/login';
import marcarHorarioValidator from '../../config/middleware/validators/marcarHorario';
import verificarAtendimentoValidator from '../../config/middleware/validators/verificarAtendimento';

import { Identifier } from '../../config/injection/identifiers';

// SERVICES
import IAtendimentoService from '../../config/interfaces/services/atendimento';
import IHorarioService from '../../config/interfaces/services/horario';
import ILoginService from '../../config/interfaces/services/login';
import IPedidoService from '../../config/interfaces/services/pedido';

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
    private _pedidoService?: IPedidoService
  ) {
    this.router = Router();
    this.atendimentoService = _atendimentoService;
    this.horarioService = _horarioService;
    this.loginService = _loginService;
    this.pedidoService = _pedidoService;

    this.constructorRoutes();
  }

  constructorRoutes() {
    this.router.post(
      '/login',
      validate(loginValidator),
      this.loginService.login
    );
    this.router.post(
      '/cadastrar',
      validate(cadastrarValidator),
      this.loginService.cadastrar
    );
    this.router.post(
      '/verifica-horario',
      validate(verificarAtendimentoValidator),
      this.horarioService.verificar
    );
    this.router.post(
      '/marcar-horario',
      isAuthenticatedUser,
      validate(marcarHorarioValidator),
      this.loginService.login
    );
    this.router.delete(
      '/cancela-atendimento',
      isAuthenticatedEmployee,
      validate(cancelarAtendimentoValidator),
      this.atendimentoService.cancelar
    );
    this.router.post(
      '/confirmar-atendimento',
      isAuthenticatedEmployee,
      validate(confirmarAtendimentoValidator),
      this.atendimentoService.confirmar
    );
    this.router.post(
      '/pedido-pendente/confirmar-entrega',
      isAuthenticatedEmployee,
      validate(confirmarEntregaPedidoValidator),
      this.pedidoService.confirmarEntrega
    );
    this.router.post(
      '/pedido-pendente/confirmar-devolucao',
      isAuthenticatedEmployee,
      validate(confirmarDevolucaoPedidoValidator),
      this.pedidoService.confirmarDevolucao
    );
  }
}

export default AcoesController;
