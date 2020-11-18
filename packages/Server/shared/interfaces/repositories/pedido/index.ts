import { DateSchema } from 'joi';
import IResponseHorarioListarPedidosPendentes from '../../response/pedido/listarPendentes';
import IResponseHorarioListaPedidosPendentesCliente from '../../response/pedido/listarPendentesCliente';

interface IPedidoRepository {
  cadastrar: (
    idAtendimento: number,
    dataPedido: DateSchema,
    dataDevolucao: DateSchema,
    vlPedido: number
  ) => Promise<void>;
  listarPendentes: () => Promise<
    IResponseHorarioListarPedidosPendentes[]
  >;
  listarPendentesCliente: (
    id: number
  ) => Promise<IResponseHorarioListaPedidosPendentesCliente[]>;
  confirmarEntrega: (id: number) => Promise<void>;
  confirmarDevolucao: (id: number) => Promise<void>;
}

export default IPedidoRepository;
