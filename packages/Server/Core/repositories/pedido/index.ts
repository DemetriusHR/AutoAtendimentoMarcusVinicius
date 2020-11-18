import { DateSchema } from 'joi';
import IResponseHorarioListarPedidosPendentes from 'shared/interfaces/response/pedido/listarPendentes';
import IResponseHorarioListaPedidosPendentesCliente from 'shared/interfaces/response/pedido/listarPendentesCliente';
import { singleton, autoInjectable, inject } from 'tsyringe';
import { Identifier } from '../../../shared/injection/identifiers';
import IBDConnect from '../../../shared/interfaces/bdConnect/interface';
import IPedidoRepository from '../../../shared/interfaces/repositories/pedido';

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
    const query = `INSERT INTO pedido(ID_Atendimento
                                     ,DT_Entrega_Pedido
                                     ,entregue
                                     ,DT_Devolucao_Pedido
                                     ,devolvido
                                     ,VL_Pedido
                                     ,SN_Pago)
                   VALUES ($1, $2, 'f', $3, 'f', $4, 'f')`;
    const variables = [idAtendimento, dataPedido, dataDevolucao, vlPedido];
    const bdConnect = this.bdConnect;

    return new Promise(async function (resolve, reject) {
      await bdConnect.connectWithinData(query, variables, reject);
      resolve(null);
    });
  }

  public async confirmarDevolucao(id: number): Promise<void> {
    const query = `UPDATE Pedido
                   SET devolvido = 't'
                   WHERE ID_Atendimento = $1`;
    const variables = [id];
    const bdConnect = this.bdConnect;

    return new Promise(async function (resolve, reject) {
      await bdConnect.connectWithinData(query, variables, reject);
      resolve(null);
    });
  }

  public async confirmarEntrega(id: number): Promise<void> {
    const query = `UPDATE Pedido
                   SET entregue = 't'
                   WHERE ID_Atendimento = $1`;
    const variables = [id];
    const bdConnect = this.bdConnect;

    return new Promise(async function (resolve, reject) {
      await bdConnect.connectWithinData(query, variables, reject);
      resolve(null);
    });
  }

  public async listarPendentes(): Promise<
    IResponseHorarioListarPedidosPendentes[]
  > {
    const query = `SELECT Pedido.ID_Atendimento as idAtendimento 
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
    const variables = [];
    const bdConnect = this.bdConnect;

    return new Promise(async function (resolve, reject) {
      resolve(
        await bdConnect.connectWithDatas<
          IResponseHorarioListarPedidosPendentes
        >(query, variables, reject)
      );
    });
  }

  public async listarPendentesCliente(
    id: number
  ): Promise<IResponseHorarioListaPedidosPendentesCliente[]> {
    const query = `SELECT Pedido.ID_Atendimento as idAtendimento 
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
    const variables = [id];
    const bdConnect = this.bdConnect;

    return new Promise(async function (resolve, reject) {
      resolve(
        await bdConnect.connectWithDatas<
          IResponseHorarioListaPedidosPendentesCliente
        >(query, variables, reject)
      );
    });
  }
}

export default PedidoRepository;
