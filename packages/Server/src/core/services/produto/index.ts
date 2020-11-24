import { Request, Response } from 'express';

import IProdutoRepository from '../../../config/interfaces/repositories/produto';
import IResponseAPI from '../../../config/interfaces/response/api';
import IProdutoService from '../../../config/interfaces/services/produto';
import ProdutoRepository from '../../repositories/produto';
import ResponseAPI from '../../response';

const repository: IProdutoRepository = new ProdutoRepository();
const response: IResponseAPI = new ResponseAPI();

class ProdutoService implements IProdutoService {
  public async listarEspecifico(req: Request, res: Response): Promise<void> {
    const idProduto: number = parseInt(req.params.id, 10);

    repository
      .listarEspecifico(idProduto)
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }

  public async listarPedido(req: Request, res: Response): Promise<void> {
    const idPedido: number = parseInt(req.params.id, 10);

    repository
      .listarPedido(idPedido)
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }

  public async listarPedidoCliente(req: Request, res: Response): Promise<void> {
    const idPedido: number = parseInt(req.params.id, 10);

    repository
      .listarPedidoCliente(idPedido)
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }

  public async listarTodos(req: Request, res: Response): Promise<void> {
    repository
      .listarTodos()
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }
}

export default ProdutoService;
