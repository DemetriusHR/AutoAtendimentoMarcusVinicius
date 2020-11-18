import { DateSchema } from 'joi';
import reject from 'shared/functions/reject';
import { singleton, autoInjectable, inject } from 'tsyringe';
import { Identifier } from '../../../shared/injection/identifiers';
import IBDConnect from '../../../shared/interfaces/bdConnect/interface';

import IHorarioRepository from '../../../shared/interfaces/repositories/horario';

@singleton()
@autoInjectable()
class HorarioRepository implements IHorarioRepository {
  private bdConnect: IBDConnect;

  constructor(
    @inject(Identifier.CONNECT)
    private poolConnect?: IBDConnect,
  ) {
    this.bdConnect = poolConnect;
  }

  public async marcar(data: DateSchema, id: number): Promise<void> {
    const query = 'CALL cadastrar_atendimento($1, $2)';
    const variables = [data, id];
    const bdConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, variables, reject);
  }

  public async verificar(data: DateSchema): Promise<number> {
    const query = `SELECT 1
                   FROM Atendimento
                   WHERE DT_Atendimento = $1`;
    const variables = [data];
    const bdConnect = this.bdConnect;

    return new Promise(async function (resolve, reject) {
      resolve(await bdConnect.connectWithData<number>(query, variables, reject));
    });
  }
}

export default HorarioRepository;
