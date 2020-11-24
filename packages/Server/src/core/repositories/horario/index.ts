import { DateSchema } from 'joi';
import { singleton, autoInjectable, inject } from 'tsyringe';

import { Identifier } from '../../../config/injection/identifiers';
import IBDConnect from '../../../config/bdConnect/interface';

import IHorarioRepository from '../../../config/interfaces/repositories/horario';

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
    const query: string = 'CALL cadastrar_atendimento($1, $2)';
    const variables: (number | DateSchema)[] = [data, id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, variables);
  }

  public async verificar(data: DateSchema): Promise<number> {
    const query: string = `SELECT 1
                           FROM Atendimento
                           WHERE DT_Atendimento = $1`;
    const variables: DateSchema[] = [data];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithData<number>(query, variables);
  }
}

export default HorarioRepository;
