import { useCallback, useReducer } from 'react';

import { reducer, initialState, ProdutoTypes } from './reducer';
import getProdutoAPI from './getProduto';
import IProduto from '../../Interfaces/IProdutoList';

interface IuseProdutoListado {
  state: {
    progress: string;
    produto: IProduto;
  };
  getProduto: (id: number) => void;
}

function useProdutoListado(): IuseProdutoListado {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProduto = useCallback((id) => {
    dispatch({
      type: ProdutoTypes.initial,
      payload: '',
    });

    getProdutoAPI(dispatch, id);
  }, []);

  return {
    state,
    getProduto,
  };
}

export default useProdutoListado;
