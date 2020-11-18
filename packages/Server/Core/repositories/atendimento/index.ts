import { DateSchema } from 'joi';
import reject from 'shared/functions/reject';
import IResponseVerificarAtendimento from 'shared/interfaces/response/atendimento/verifica';
import { singleton, autoInjectable, inject } from 'tsyringe';
import { Identifier } from '../../../shared/injection/identifiers';
import IBDConnect from '../../../shared/interfaces/bdConnect/interface';

import IAtendimentoRepository from '../../../shared/interfaces/repositories/atendimento';

@singleton()
@autoInjectable()
class AtendimentoRepository implements IAtendimentoRepository {
  private bdConnect: IBDConnect;

  constructor(
    @inject(Identifier.CONNECT)
    private poolConnect?: IBDConnect,
  ) {
    this.bdConnect = poolConnect;
  }

  public async verificar(
    dataInicial: DateSchema,
    dataFinal: DateSchema
  ): Promise<IResponseVerificarAtendimento[]> {
    const query = `SELECT ID_Atendimento     as idAtendimento
                       ,DT_Atendimento     as dataAtendimento
                       ,Usuario.ID_Usuario as idCliente
                       ,Usuario.NM_Usuario as nomeCliente
                   FROM Atendimento
                   INNER JOIN Usuario
                   ON Usuario.id_usuario = Atendimento.id_usuario
                   WHERE DT_Atendimento        >= $1
                     AND DT_Atendimento        <= $2
                     AND Atendimento_Realizado = 'f'`;
    const variables = [dataInicial, dataFinal];
    const bdConnect = this.bdConnect;

    return await bdConnect.connectWithDatas<IResponseVerificarAtendimento>(
      query,
      variables,
      reject
    );
  }

  public async atualizar(id: number): Promise<void> {
    const query = `UPDATE Atendimento
                   SET Atendimento_Realizado = 't'
                   WHERE ID_Atendimento = $1`;
    const variables = [id];
    const bdConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, variables, reject);
  }
}

export default AtendimentoRepository;
