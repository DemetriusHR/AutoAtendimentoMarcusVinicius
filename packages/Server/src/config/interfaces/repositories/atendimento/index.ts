import { DateSchema } from 'joi';
import IResponseVerificarAtendimento from '../../response/atendimento/verifica';

interface IAtendimentoRepository {
  verificar: (
    dataInicial: DateSchema,
    dataFinal: DateSchema
  ) => Promise<IResponseVerificarAtendimento[]>;
  atualizar: (id: number) => Promise<void>;
}

export default IAtendimentoRepository;
