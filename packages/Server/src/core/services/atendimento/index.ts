import { Request, Response } from 'express';
import IAtendimentoRepository from '../../../config/interfaces/repositories/atendimento';
import IPedidoRepository from '../../../config/interfaces/repositories/pedido';
import IProdutoRepository from '../../../config/interfaces/repositories/produto';
import IResponseAPI from '../../../config/interfaces/response/api';
import IAtendimentoService from '../../../config/interfaces/services/atendimento';

import { singleton, autoInjectable, inject } from 'tsyringe';
import { Identifier } from '../../../config/injection/identifiers';

@singleton()
@autoInjectable()
class AtendimentoService implements IAtendimentoService {
  private repository: IAtendimentoRepository;
  private pedidoRepository: IPedidoRepository;
  private produtoRepository: IProdutoRepository;
  private response: IResponseAPI;

  constructor(
    @inject(Identifier.ATENDIMENTO_REPOSITORY)
    private injectRepository?: IAtendimentoRepository,
    @inject(Identifier.RESPONSE_API)
    private injectResponse?: IResponseAPI,
    @inject(Identifier.PEDIDO_REPOSITORY)
    private injectPedidoRepository?: IPedidoRepository,
    @inject(Identifier.PRODUTO_REPOSITORY)
    private injectProdutoRepository?: IProdutoRepository
  ) {
    this.repository = injectRepository;
    this.response = injectResponse;
    this.pedidoRepository = injectPedidoRepository;
    this.produtoRepository = injectProdutoRepository;
  }

  public async verificar(req: Request, res: Response): Promise<void> {
    const { dataInicial, dataFinal } = req.body;

    await this.repository
      .verificar(dataInicial, dataFinal)
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }

  public async cancelar(req: Request, res: Response): Promise<void> {
    const { idAtendimento } = req.body;

    await this.repository
      .atualizar(idAtendimento)
      .then(() => {
        this.response.success(res);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }

  public async confirmar(req: Request, res: Response): Promise<void> {
    const {
      idAtendimento,
      dataPedido,
      dataDevolucao,
      vlPedido,
      produtos,
    } = req.body;

    await this.repository
      .atualizar(idAtendimento)
      .then(() => {
        this.pedidoRepository
          .cadastrar(idAtendimento, dataPedido, dataDevolucao, vlPedido)
          .then(() => {
            this.produtoRepository
              .cadastrar(produtos)
              .then(() => {
                this.response.success(res);
              })
              .catch((err) => {
                this.response.error(res, err);
              });
          })
          .catch((err) => {
            this.response.error(res, err);
          });
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }
}

export default AtendimentoService;
