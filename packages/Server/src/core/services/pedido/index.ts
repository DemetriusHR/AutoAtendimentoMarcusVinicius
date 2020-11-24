import { Request, Response } from 'express';
import { singleton, autoInjectable, inject } from 'tsyringe';

import IPedidoRepository from '../../../config/interfaces/repositories/pedido';
import IResponseAPI from '../../../config/interfaces/response/api';
import IPedidoService from '../../../config/interfaces/services/pedido';
import { Identifier } from '../../../config/injection/identifiers';

@singleton()
@autoInjectable()
class PedidoService implements IPedidoService {
  private repository: IPedidoRepository;
  private response: IResponseAPI;

  constructor(
    @inject(Identifier.PEDIDO_REPOSITORY)
    private injectRepository?: IPedidoRepository,
    @inject(Identifier.RESPONSE_API)
    private injectResponse?: IResponseAPI
  ) {
    this.repository = injectRepository;
    this.response = injectResponse;
  }

  public async confirmarDevolucao(req: Request, res: Response): Promise<void> {
    const { idPedido } = req.body;

    this.repository
      .confirmarDevolucao(idPedido)
      .then(() => this.response.success(res))
      .catch((err) => this.response.error(res, err));
  }

  public async confirmarEntrega(req: Request, res: Response): Promise<void> {
    const { idPedido } = req.body;

    this.repository
      .confirmarEntrega(idPedido)
      .then(() => this.response.success(res))
      .catch((err) => this.response.error(res, err));
  }

  public async listarPendentes(req: Request, res: Response): Promise<void> {
    this.repository
      .listarPendentes()
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }

  public async listarPendentesCliente(
    req: Request,
    res: Response
  ): Promise<void> {
    const idUsuario = parseInt(req.params.id);

    this.repository
      .listarPendentesCliente(idUsuario)
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }
}

export default PedidoService;
