import { useCallback, useReducer } from 'react';

import { reducer, initialState, ProdutosTypes } from './reducer';
import getProdutosAPI from './getProdutos';
import IProduto from '../../Interfaces/IProdutoList';

interface IuseProdutos {
  state: {
    progress: string;
    produtos: IProduto[];
  };
  getProdutos: (onLogin: () => void) => void;
}

function useProdutos(): IuseProdutos {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProdutos = useCallback((onLogin) => {
    dispatch({
      type: ProdutosTypes.initial,
      payload: '',
    });

    getProdutosAPI(dispatch, onLogin);
  }, []);

  return {
    state,
    getProdutos,
  };
}

export default useProdutos;
