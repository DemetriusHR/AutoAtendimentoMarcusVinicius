import { DateSchema } from 'joi';
import { singleton, autoInjectable, inject } from 'tsyringe';

import IResponseHorarioListarPedidosPendentes from '../../../config/interfaces/response/pedido/listarPendentes';
import IResponseHorarioListaPedidosPendentesCliente from '../../../config/interfaces/response/pedido/listarPendentesCliente';
import IBDConnect from '../../../config/bdConnect/interface';
import IPedidoRepository from '../../../config/interfaces/repositories/pedido';
import { Identifier } from '../../../config/injection/identifiers';

@singleton()
@autoInjectable()
class PedidoRepository implements IPedidoRepository {
  private bdConnect: IBDConnect;

  constructor(
    @inject(Identifier.CONNECT)
    private poolConnect?: IBDConnect
  ) {
    this.bdConnect = poolConnect;
  }

  public async cadastrar(
    idAtendimento: number,
    dataPedido: DateSchema,
    dataDevolucao: DateSchema,
    vlPedido: number
  ): Promise<void> {
    const query: string = `INSERT INTO pedido(ID_Atendimento
                                             ,DT_Entrega_Pedido
                                             ,entregue
                                             ,DT_Devolucao_Pedido
                                             ,devolvido
                                             ,VL_Pedido
                                             ,SN_Pago)
                           VALUES ($1, $2, 'f', $3, 'f', $4, 'f')`;
    const variables: (number | DateSchema)[] = [
      idAtendimento,
      dataPedido,
      dataDevolucao,
      vlPedido,
    ];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, variables);
  }

  public async confirmarDevolucao(id: number): Promise<void> {
    const query: string = `UPDATE Pedido
                           SET devolvido = 't'
                           WHERE ID_Atendimento = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, variables);
  }

  public async confirmarEntrega(id: number): Promise<void> {
    const query: string = `UPDATE Pedido
                           SET entregue = 't'
                           WHERE ID_Atendimento = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, variables);
  }

  public async listarPendentes(): Promise<
    IResponseHorarioListarPedidosPendentes[]
  > {
    const query: string = `SELECT Pedido.ID_Atendimento as idAtendimento 
                                 ,CASE
                                    WHEN entregue = 'f'                     THEN DT_Entrega_Pedido
                                    WHEN entregue = 't' AND devolvido = 'f' THEN DT_Devolucao_Pedido
                                  END AS dtPedido
                                 ,Usuario.ID_Usuario  as idCliente
                                 ,Usuario.NM_Usuario  as nomeCliente
                                 ,Usuario.TEL_Usuario as celCliente
                                 ,entregue
                                 ,devolvido
                           FROM Atendimento
                             INNER JOIN Pedido
                             ON Pedido.ID_Atendimento = Atendimento.ID_Atendimento
                             INNER JOIN Usuario
                             ON Usuario.ID_Usuario = Atendimento.ID_Usuario
                           WHERE Pedido.devolvido = 'f'`;
    const variables: any = [];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithDatas<IResponseHorarioListarPedidosPendentes>(
      query,
      variables
    );
  }

  public async listarPendentesCliente(
    id: number
  ): Promise<IResponseHorarioListaPedidosPendentesCliente[]> {
    const query: string = `SELECT Pedido.ID_Atendimento as idAtendimento 
                                 ,CASE
                                    WHEN entregue = 'f'                     THEN DT_Entrega_Pedido
                                    WHEN entregue = 't' AND devolvido = 'f' THEN DT_Devolucao_Pedido
                                  END AS dtPedido
                                 ,entregue
                                 ,devolvido
                           FROM Atendimento
                             INNER JOIN Pedido
                             ON Pedido.ID_Atendimento = Atendimento.ID_Atendimento
                           WHERE Pedido.devolvido       = 'f'
                             AND Atendimento.id_usuario = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithDatas<IResponseHorarioListaPedidosPendentesCliente>(
      query,
      variables
    );
  }
}

export default PedidoRepository;
