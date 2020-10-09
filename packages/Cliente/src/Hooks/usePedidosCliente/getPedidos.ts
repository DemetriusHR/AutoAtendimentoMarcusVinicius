import {
  PedidosActions,
  PedidosTypes,
} from './reducer';
import IPedido from '../../Interfaces/IPedido';

const pedidosTeste: IPedido[] = [
  {
    dataPedido: new Date(
      2020,
      6,
      12,
      10,
      30
    ),
    dataEntrega: null,
    dataDevolucao: null,
  },
];

export default function getPedidos(
  dispatch: (
    value: PedidosActions
  ) => void
) {
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
      }
    );
  } else {
    dispatch(
      {
        type:
          PedidosTypes.error,
        payload:
          '',
      }
    );
  }
}
