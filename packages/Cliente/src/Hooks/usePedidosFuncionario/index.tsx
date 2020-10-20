import { useCallback, useReducer } from 'react';

import { reducer, initialState, PedidosTypes } from './reducer';
import getPedidosAPI from './getPedidos';
import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';

interface IusePedidosCliente {
  state: {
    progress: string;
    pedidos: IPedidoFuncionario[];
  };
  getPedidos: () => void;
}

function usePedidosCliente(): IusePedidosCliente {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPedidos = useCallback(() => {
    dispatch({
      type: PedidosTypes.initial,
      payload: '',
    });

    getPedidosAPI(dispatch);
  }, []);

  return {
    state,
    getPedidos,
  };
}

export default usePedidosCliente;
