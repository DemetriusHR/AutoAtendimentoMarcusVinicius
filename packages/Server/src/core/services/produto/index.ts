import { Request, Response } from 'express';
import { autoInjectable, inject, singleton } from 'tsyringe';

import IProdutoRepository from '../../../config/interfaces/repositories/produto';
import IResponseAPI from '../../../config/interfaces/response/api';
import IProdutoService from '../../../config/interfaces/services/produto';
import { Identifier } from '../../../config/injection/identifiers';

@singleton()
@autoInjectable()
class ProdutoService implements IProdutoService {
  private repository: IProdutoRepository;
  private response: IResponseAPI;

  constructor(
    @inject(Identifier.PRODUTO_REPOSITORY)
    private injectRepository?: IProdutoRepository,
    @inject(Identifier.RESPONSE_API)
    private injectResponse?: IResponseAPI
  ) {
    this.repository = injectRepository;
    this.response = injectResponse;
  }

  public async listarEspecifico(req: Request, res: Response): Promise<void> {
    const idProduto = parseInt(req.params.id, 10);

    this.repository
      .listarEspecifico(idProduto)
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }

  public async listarPedido(req: Request, res: Response): Promise<void> {
    const idPedido = parseInt(req.params.id, 10);

    this.repository
      .listarPedido(idPedido)
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }

  public async listarPedidoCliente(req: Request, res: Response): Promise<void> {
    const idPedido = parseInt(req.params.id, 10);

    this.repository
      .listarPedidoCliente(idPedido)
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }

  public async listarTodos(req: Request, res: Response): Promise<void> {
    this.repository
      .listarTodos()
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }
}

export default ProdutoService;
