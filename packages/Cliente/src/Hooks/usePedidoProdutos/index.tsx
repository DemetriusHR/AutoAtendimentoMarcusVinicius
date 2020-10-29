import { useCallback, useReducer } from 'react';

import { reducer, initialState, ProdutosTypes } from './reducer';
import getPedidoProdutosAPI from './getPedidoProdutos';
import IProduto from '../../Interfaces/IProduto';

interface IusePedidoProdutos {
  state: {
    progress: string;
    produtos: IProduto[];
  };
  getPedidoProdutos: (idPedido: number, onLogin: () => void) => void;
}

function usePedidoProdutos(): IusePedidoProdutos {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPedidoProdutos = useCallback((idPedido, onLogin) => {
    dispatch({
      type: ProdutosTypes.initial,
      payload: '',
    });

    getPedidoProdutosAPI(dispatch, idPedido, onLogin);
  }, []);

  return {
    state,
    getPedidoProdutos,
  };
}

export default usePedidoProdutos;
