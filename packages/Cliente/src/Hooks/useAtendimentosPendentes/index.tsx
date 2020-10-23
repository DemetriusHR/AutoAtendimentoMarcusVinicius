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
  getAtendimentosPendentes: (data: moment.Moment) => void;
}

function useAtendimentosPendentes(): IuseAtendimentosPendentes {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAtendimentosPendentes = useCallback((data) => {
    dispatch({
      type: AtendimentosPendentesTypes.initial,
      payload: '',
    });

    getAtendimentosPendentesAPI(dispatch, data);
  }, []);

  return {
    state,
    getAtendimentosPendentes,
  };
}

export default useAtendimentosPendentes;
