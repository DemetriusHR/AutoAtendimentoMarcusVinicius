import { Router } from 'express';

import {
  isAuthenticatedEmployee,
  isAuthenticatedUser,
} from '../../config/middleware/jwtAuth';

// VALIDATORS

import middlewareValidator from '../../config/middleware/validators';
import cadastrarValidator from '../../config/middleware/validators/cadastrar';
import cancelarAtendimentoValidator from '../../config/middleware/validators/cancelarAtendimento';
import confirmarDevolucaoPedidoValidator from '../../config/middleware/validators/confirmarDevolucaoPedido';
import confirmarEntregaPedidoValidator from '../../config/middleware/validators/confirmarEntregaPedido';
import confirmarAtendimentoValidator from '../../config/middleware/validators/confirmarAtendimento';
import loginValidator from '../../config/middleware/validators/login';
import marcarHorarioValidator from '../../config/middleware/validators/marcarHorario';
import verificarAtendimentoValidator from '../../config/middleware/validators/verificarAtendimento';

// SERVICES
import IAtendimentoService from '../../config/interfaces/services/atendimento';
import IHorarioService from '../../config/interfaces/services/horario';
import ILoginService from '../../config/interfaces/services/login';
import IPedidoService from '../../config/interfaces/services/pedido';
import AtendimentoService from '../../core/services/atendimento';
import HorarioService from '../../core/services/horario';
import PedidoService from '../../core/services/pedido';
import LoginService from '../../core/services/login';

class AcoesController {
  public router: Router;
  private atendimentoService: IAtendimentoService;
  private horarioService: IHorarioService;
  private loginService: ILoginService;
  private pedidoService: IPedidoService;

  constructor() {
    this.router = Router();
    this.atendimentoService = new AtendimentoService();
    this.horarioService = new HorarioService();
    this.loginService = new LoginService();
    this.pedidoService = new PedidoService();

    this.constructorRoutes();
  }

  constructorRoutes(): void {
    this.router.post(
      '/login',
      middlewareValidator(loginValidator),
      this.loginService.login
    );
    this.router.post(
      '/cadastrar',
      middlewareValidator(cadastrarValidator),
      this.loginService.cadastrar
    );
    this.router.post(
      '/verifica-horario',
      middlewareValidator(verificarAtendimentoValidator),
      this.horarioService.verificar
    );
    this.router.post(
      '/marcar-horario',
      isAuthenticatedUser,
      middlewareValidator(marcarHorarioValidator),
      this.loginService.login
    );
    this.router.delete(
      '/cancela-atendimento',
      isAuthenticatedEmployee,
      middlewareValidator(cancelarAtendimentoValidator),
      this.atendimentoService.cancelar
    );
    this.router.post(
      '/confirmar-atendimento',
      isAuthenticatedEmployee,
      middlewareValidator(confirmarAtendimentoValidator),
      this.atendimentoService.confirmar
    );
    this.router.post(
      '/pedido-pendente/confirmar-entrega',
      isAuthenticatedEmployee,
      middlewareValidator(confirmarEntregaPedidoValidator),
      this.pedidoService.confirmarEntrega
    );
    this.router.post(
      '/pedido-pendente/confirmar-devolucao',
      isAuthenticatedEmployee,
      middlewareValidator(confirmarDevolucaoPedidoValidator),
      this.pedidoService.confirmarDevolucao
    );
  }
}

export default AcoesController;
