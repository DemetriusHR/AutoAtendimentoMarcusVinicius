import { DateSchema } from 'joi';

import IBDConnect from '../../../config/bdConnect/interface';

import IHorarioRepository from '../../../config/interfaces/repositories/horario';
import BDConnect from '../../../config/bdConnect';

class HorarioRepository implements IHorarioRepository {
  private bdConnect: IBDConnect;

  constructor() {
    this.bdConnect = new BDConnect();
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
