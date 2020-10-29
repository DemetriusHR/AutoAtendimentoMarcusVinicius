import { useCallback, useReducer } from 'react';

import { reducer, initialState, EnderecoTypes } from './reducer';
import getEnderecosAPI from './getEnderecos';
import IEndereco from '../../Interfaces/IEndereco';

interface IuseEnderecoCliente {
  state: {
    progress: string;
    enderecos: IEndereco[];
  };
  getEnderecos: (idEndereco: number, onLogin: () => void) => void;
}

function useEnderecoCliente(): IuseEnderecoCliente {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getEnderecos = useCallback((idEndereco, onLogin) => {
    dispatch({
      type: EnderecoTypes.initial,
      payload: '',
    });

    getEnderecosAPI(dispatch, idEndereco, onLogin);
  }, []);

  return {
    state,
    getEnderecos,
  };
}

export default useEnderecoCliente;
