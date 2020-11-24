import { DateSchema } from 'joi';

import IResponseVerificarAtendimento from '../../../config/interfaces/response/atendimento/verifica';
import IBDConnect from '../../../config/bdConnect/interface';
import IAtendimentoRepository from '../../../config/interfaces/repositories/atendimento';
import BDConnect from '../../../config/bdConnect';

class AtendimentoRepository implements IAtendimentoRepository {
  private bdConnect: IBDConnect;

  constructor() {
    this.bdConnect = new BDConnect();
  }

  public async verificar(
    dataInicial: DateSchema,
    dataFinal: DateSchema
  ): Promise<IResponseVerificarAtendimento[]> {
    const query: string = `SELECT ID_Atendimento     as idAtendimento
                               ,DT_Atendimento     as dataAtendimento
                               ,Usuario.ID_Usuario as idCliente
                               ,Usuario.NM_Usuario as nomeCliente
                           FROM Atendimento
                             INNER JOIN Usuario
                             ON Usuario.id_usuario = Atendimento.id_usuario
                           WHERE DT_Atendimento        >= $1
                             AND DT_Atendimento        <= $2
                             AND Atendimento_Realizado = 'f'`;
    const variables: DateSchema[] = [dataInicial, dataFinal];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithDatas<IResponseVerificarAtendimento>(
      query,
      variables
    );
  }

  public async atualizar(id: number): Promise<void> {
    const query: string = `UPDATE Atendimento
                           SET Atendimento_Realizado = 't'
                           WHERE ID_Atendimento = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, variables);
  }
}

export default AtendimentoRepository;
