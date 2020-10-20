import { useCallback, useReducer } from 'react';

import { reducer, initialState, ProdutosTypes } from './reducer';
import getPedidoProdutosAPI from './getPedidoProdutos';
import IProduto from '../../Interfaces/IProduto';

interface IusePedidoProdutos {
  state: {
    progress: string;
    produtos: IProduto[];
  };
  getPedidoProdutos: (idPedido: number) => void;
}

function usePedidoProdutos(): IusePedidoProdutos {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPedidoProdutos = useCallback((idPedido) => {
    dispatch({
      type: ProdutosTypes.initial,
      payload: '',
    });

    getPedidoProdutosAPI(dispatch, idPedido);
  }, []);

  return {
    state,
    getPedidoProdutos,
  };
}

export default usePedidoProdutos;
