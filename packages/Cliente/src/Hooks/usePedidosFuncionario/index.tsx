import { useCallback, useReducer } from 'react';

import { reducer, initialState, PedidosTypes } from './reducer';
import getPedidosAPI from './getPedidos';
import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';

interface IusePedidosCliente {
  state: {
    progress: string;
    pedidos: IPedidoFuncionario[];
  };
  getPedidos: (onLogin: () => void) => void;
}

function usePedidosCliente(): IusePedidosCliente {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPedidos = useCallback((onLogin) => {
    dispatch({
      type: PedidosTypes.initial,
      payload: '',
    });

    getPedidosAPI(dispatch, onLogin);
  }, []);

  return {
    state,
    getPedidos,
  };
}

export default usePedidosCliente;
