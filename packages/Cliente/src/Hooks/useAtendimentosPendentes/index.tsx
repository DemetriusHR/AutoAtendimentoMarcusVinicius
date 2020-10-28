import { useCallback, useReducer } from 'react';
import moment from 'moment';

import { reducer, initialState, AtendimentosPendentesTypes } from './reducer';
import getAtendimentosPendentesAPI from './getAtendimentosPendentes';
import IAtendimentoPendente from '../../Interfaces/IAtendimentoPendente';

interface IuseAtendimentosPendentes {
  state: {
    progress: string;
    atendimentosPendentes: IAtendimentoPendente[];
  };
  getAtendimentosPendentes: (data: moment.Moment, onLogin: () => void) => void;
}

function useAtendimentosPendentes(): IuseAtendimentosPendentes {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAtendimentosPendentes = useCallback((data, onLogin) => {
    dispatch({
      type: AtendimentosPendentesTypes.initial,
      payload: '',
    });

    getAtendimentosPendentesAPI(dispatch, data, onLogin);
  }, []);

  return {
    state,
    getAtendimentosPendentes,
  };
}

export default useAtendimentosPendentes;
