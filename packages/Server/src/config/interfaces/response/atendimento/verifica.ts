import { DateSchema } from 'joi';

interface IResponseVerificarAtendimento {
  idAtendimento: number;
  dataAtendimento: DateSchema;
  idCliente: number;
  nomeCliente: string;
}

export default IResponseVerificarAtendimento;
