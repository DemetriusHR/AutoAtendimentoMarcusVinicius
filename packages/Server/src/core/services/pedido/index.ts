import { Request, Response } from 'express';

import IPedidoRepository from '../../../config/interfaces/repositories/pedido';
import IResponseAPI from '../../../config/interfaces/response/api';
import IPedidoService from '../../../config/interfaces/services/pedido';
import PedidoRepository from '../../repositories/pedido';
import ResponseAPI from '../../response';

const repository: IPedidoRepository = new PedidoRepository();
const response: IResponseAPI = new ResponseAPI();

class PedidoService implements IPedidoService {
  public async confirmarDevolucao(req: Request, res: Response): Promise<void> {
    const idPedido: number = req.body.idPedido;

    repository
      .confirmarDevolucao(idPedido)
      .then(() => response.success(res))
      .catch((err) => response.error(res, err));
  }

  public async confirmarEntrega(req: Request, res: Response): Promise<void> {
    const idPedido: number = req.body.idPedido;

    repository
      .confirmarEntrega(idPedido)
      .then(() => response.success(res))
      .catch((err) => response.error(res, err));
  }

  public async listarPendentes(req: Request, res: Response): Promise<void> {
    repository
      .listarPendentes()
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }

  public async listarPendentesCliente(
    req: Request,
    res: Response
  ): Promise<void> {
    const idUsuario: number = parseInt(req.params.id, 10);

    repository
      .listarPendentesCliente(idUsuario)
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }
}

export default PedidoService;
