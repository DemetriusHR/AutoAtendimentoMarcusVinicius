import moment from 'moment';

import { HorarioActions, HorarioTypes } from './reducer';

const atendimentoTeste: moment.Moment = moment([2020, 9, 1, 9, 30]);

export default function getVerificaAtendimento(
  dispatch: (value: HorarioActions) => void,
  data: moment.Moment,
): void {
  if (atendimentoTeste.isSame(data)) {
    dispatch({
      type: HorarioTypes.sucess,
      payload: {
        data: true,
      },
    });
  } else {
    dispatch({
      type: HorarioTypes.error,
      payload: '',
    });
  }
}
