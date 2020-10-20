import {
  PedidosActions,
  PedidosTypes,
} from './reducer';
import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';

const pedidosTeste: IPedidoFuncionario[] = [
  {
    idPedido: 1,
    dataPedido: new Date(
      2020,
      6,
      12,
      10,
      30,
    ),
    dataEntrega: null,
    dataDevolucao: null,
    idCliente: 1,
    cliente: 'Teste 1',
  },
  {
    idPedido: 2,
    dataPedido: new Date(
      2020,
      6,
      12,
      10,
      30,
    ),
    dataEntrega: new Date(
      2020,
      6,
      18,
      10,
      30,
    ),
    dataDevolucao: null,
    idCliente: 2,
    cliente: 'Teste 2',
  },
  {
    idPedido: 3,
    dataPedido: new Date(
      2020,
      6,
      12,
      10,
      30,
    ),
    dataEntrega: new Date(
      2020,
      6,
      18,
      10,
      30,
    ),
    dataDevolucao: null,
    idCliente: 3,
    cliente: 'Teste 3',
  },
];

export default function getPedidos(
  dispatch: (
    value: PedidosActions
  ) => void,
): void {
  if (
    pedidosTeste.length
  ) {
    dispatch(
      {
        type:
          PedidosTypes.sucess,
        payload: {
          data: pedidosTeste,
        },
      },
    );
  } else {
    dispatch(
      {
        type:
          PedidosTypes.error,
        payload:
          '',
      },
    );
  }
}
