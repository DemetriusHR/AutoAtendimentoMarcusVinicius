import { PedidosActions, PedidosTypes } from './reducer';
import IPedido from '../../Interfaces/IPedido';
import { PedidosPendentesClienteRequestAPI } from '../../RequestAPI/Atendimento';

export default function getPedidos(
  dispatch: (value: PedidosActions) => void,
  id: number,
  onLogin: () => void,
): void {
  function errorDispatch(): void {
    dispatch({
      type: PedidosTypes.error,
      payload: '',
    });
  }

  function sucessDispatch(retorno: IPedido[]): void {
    dispatch({
      type: PedidosTypes.sucess,
      payload: {
        data: retorno,
      },
    });
  }

  PedidosPendentesClienteRequestAPI(id, errorDispatch, sucessDispatch, onLogin);
}
