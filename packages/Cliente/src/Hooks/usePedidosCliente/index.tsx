import { useCallback, useReducer } from 'react';

import { reducer, initialState, PedidosTypes } from './reducer';
import getPedidosAPI from './getPedidos';
import IPedido from '../../Interfaces/IPedido';

interface IusePedidoCliente {
  state: {
    progress: string;
    pedidos: IPedido[];
  };
  getPedidos: (id: number, onLogin: () => void) => void;
}

function usePedidosCliente(): IusePedidoCliente {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPedidos = useCallback((id, onLogin) => {
    dispatch({
      type: PedidosTypes.initial,
      payload: '',
    });

    getPedidosAPI(dispatch, id, onLogin);
  }, []);

  return {
    state,
    getPedidos,
  };
}

export default usePedidosCliente;
