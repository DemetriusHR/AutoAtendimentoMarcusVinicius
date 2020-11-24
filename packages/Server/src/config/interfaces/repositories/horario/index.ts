import { DateSchema } from 'joi';

interface IHorarioRepository {
  verificar: (data: DateSchema) => Promise<number>;
  marcar: (data: DateSchema, id: number) => Promise<void>;
}

export default IHorarioRepository;
