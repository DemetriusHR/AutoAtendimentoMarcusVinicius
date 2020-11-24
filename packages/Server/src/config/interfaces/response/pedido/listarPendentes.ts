import { DateSchema } from 'joi';

interface IResponseHorarioListarPedidosPendentes {
  idAtendimento: number;
  dtPedido: DateSchema;
  idCliente: number;
  nomeCliente: string;
  celCliente: number;
}

export default IResponseHorarioListarPedidosPendentes;
