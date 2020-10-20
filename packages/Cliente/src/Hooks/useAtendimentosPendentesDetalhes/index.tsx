import {
  useCallback,
  useReducer,
} from 'react';
import moment from 'moment';

import {
  reducer,
  initialState,
  AtendimentosPendentesTypes,
} from './reducer';
import getAtendimentosPendentesAPI from './getAtendimentosPendentes';
import IAtendimentoPendente from '../../Interfaces/IAtendimentoPendente';

interface IuseAtendimentosPendentesDetalhes {
  state: {
    progress: string;
    atendimentosPendentes: IAtendimentoPendente | null;
  };
  getAtendimentosPendentes: (data: moment.Moment) => void;
}

function useAtendimentosPendentesDetalhes(): IuseAtendimentosPendentesDetalhes {
  const [
    state,
    dispatch,
  ] = useReducer(
    reducer,
    initialState,
  );

  const getAtendimentosPendentes = useCallback((data) => {
    dispatch(
      {
        type:
        AtendimentosPendentesTypes.initial,
        payload:
          '',
      },
    );

    getAtendimentosPendentesAPI(
      dispatch,
      data,
    );
  }, []);

  return {
    state,
    getAtendimentosPendentes,
  };
}

export default useAtendimentosPendentesDetalhes;
