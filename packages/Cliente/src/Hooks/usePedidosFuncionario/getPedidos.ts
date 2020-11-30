import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';
import { PedidosActions, PedidosTypes } from './reducer';
import { PedidosPendentesRequestAPI } from '../../RequestAPI/Pedido';

export default function getPedidos(
  dispatch: (value: PedidosActions) => void,
  onLogin: () => void,
): void {
  function errorDispatch(): void {
    dispatch({
      type: PedidosTypes.error,
      payload: '',
    });
  }

  function sucessDispatch(retorno: IPedidoFuncionario[]): void {
    dispatch({
      type: PedidosTypes.sucess,
      payload: {
        data: retorno,
      },
    });
  }

  PedidosPendentesRequestAPI(errorDispatch, sucessDispatch, onLogin);
}
