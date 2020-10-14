import {
  useCallback,
  useReducer,
} from 'react';
import moment from 'moment';

import {
  reducer,
  initialState,
  AtendimentoTypes,
} from './reducer';
import getVerificaAtendimentoAPI from './getVerificaAtendimento';

interface IuseVerificaAtendimento {
  state: {
    progress: string;
    atendimento: boolean;
  };
  getVerificacao: (data: moment.Moment) => void;
}

function useVerificaAtendimento(): IuseVerificaAtendimento {
  const [
    state,
    dispatch,
  ] = useReducer(
    reducer,
    initialState,
  );

  const getVerificacao = useCallback((data: moment.Moment) => {
    dispatch(
      {
        type:
        AtendimentoTypes.initial,
        payload:
          '',
      },
    );

    getVerificaAtendimentoAPI(
      dispatch,
      data,
    );
  }, []);

  return {
    state,
    getVerificacao,
  };
}

export default useVerificaAtendimento;
