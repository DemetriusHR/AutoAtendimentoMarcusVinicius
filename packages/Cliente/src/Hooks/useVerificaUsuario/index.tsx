import { useCallback, useReducer } from 'react';

import { reducer, initialState, UsuarioTypes } from './reducer';
import getVericaUsuarioAPI from './getVericaUsuario';

interface IuseVerificaUsuario {
  state: {
    progress: string;
    usuario: {
      funcionario: boolean;
    };
  };
  getVerificacaoUsuario: () => void;
}

function useVerificaUsuario(): IuseVerificaUsuario {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getVerificacaoUsuario = useCallback(() => {
    dispatch({
      type: UsuarioTypes.initial,
      payload: '',
    });

    getVericaUsuarioAPI(dispatch);
  }, []);

  return {
    state,
    getVerificacaoUsuario,
  };
}

export default useVerificaUsuario;
