import { Request, Response } from 'express';
import { DateSchema } from 'joi';

import IAtendimentoRepository from '../../../config/interfaces/repositories/atendimento';
import IPedidoRepository from '../../../config/interfaces/repositories/pedido';
import IProdutoRepository from '../../../config/interfaces/repositories/produto';
import IResponseAPI from '../../../config/interfaces/response/api';
import IAtendimentoService from '../../../config/interfaces/services/atendimento';
import IEntranceProduto from '../../../config/interfaces/entrances/produto';
import AtendimentoRepository from '../../repositories/atendimento';
import ResponseAPI from '../../response';
import PedidoRepository from '../../repositories/pedido';
import ProdutoRepository from '../../repositories/produto';

const repository: IAtendimentoRepository = new AtendimentoRepository();
const response: IResponseAPI = new ResponseAPI();
const pedidoRepository: IPedidoRepository = new PedidoRepository();
const produtoRepository: IProdutoRepository = new ProdutoRepository();

class AtendimentoService implements IAtendimentoService {
  public async verificar(req: Request, res: Response): Promise<void> {
    const dataInicial: DateSchema = req.body.dataInicial;
    const dataFinal: DateSchema = req.body.dataFinal;

    await repository
      .verificar(dataInicial, dataFinal)
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }

  public async cancelar(req: Request, res: Response): Promise<void> {
    const idAtendimento: number = req.body.idAtendimento;

    await repository
      .atualizar(idAtendimento)
      .then(() => {
        response.success(res);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }

  public async confirmar(req: Request, res: Response): Promise<void> {
    const idAtendimento: number = req.body.idAtendimento;
    const dataPedido: DateSchema = req.body.dataPedido;
    const dataDevolucao: DateSchema = req.body.dataDevolucao;
    const vlPedido: number = req.body.vlPedido;
    const produtos: IEntranceProduto[] = req.body.produtos;

    await repository
      .atualizar(idAtendimento)
      .then(() => {
        pedidoRepository
          .cadastrar(idAtendimento, dataPedido, dataDevolucao, vlPedido)
          .then(() => {
            produtoRepository
              .cadastrar(produtos)
              .then(() => {
                response.success(res);
              })
              .catch((err) => {
                response.error(res, err);
              });
          })
          .catch((err) => {
            response.error(res, err);
          });
      })
      .catch((err) => {
        response.error(res, err);
      });
  }
}

export default AtendimentoService;
