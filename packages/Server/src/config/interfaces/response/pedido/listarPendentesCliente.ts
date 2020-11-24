import { DateSchema } from 'joi';

interface IResponseHorarioListaPedidosPendentesCliente {
  idAtendimento: number;
  dtPedido: DateSchema;
  entregue: boolean;
  devolvido: boolean;
}

export default IResponseHorarioListaPedidosPendentesCliente;
