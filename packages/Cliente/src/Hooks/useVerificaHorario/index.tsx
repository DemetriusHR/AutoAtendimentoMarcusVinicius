import {
  useCallback,
  useReducer,
} from 'react';
import moment from 'moment';

import {
  reducer,
  initialState,
  HorarioTypes,
} from './reducer';
import getVericaHorarioAPI from './getVericaHorario';

interface IuseVerificaHorario {
  state: {
    progress: string;
    horario: boolean;
  };
  getVerificacaoHorario: (data: moment.Moment) => void;
}

function useVerificaHorario(): IuseVerificaHorario {
  const [
    state,
    dispatch,
  ] = useReducer(
    reducer,
    initialState,
  );

  const getVerificacaoHorario = useCallback((data: moment.Moment) => {
    dispatch(
      {
        type:
          HorarioTypes.initial,
        payload:
          '',
      },
    );

    getVericaHorarioAPI(
      dispatch,
      data,
    );
  }, []);

  return {
    state,
    getVerificacaoHorario,
  };
}

export default useVerificaHorario;
