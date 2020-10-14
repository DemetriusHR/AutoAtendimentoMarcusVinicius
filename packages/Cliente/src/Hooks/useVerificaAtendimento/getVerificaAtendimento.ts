import moment from 'moment';

import {
  AtendimentoActions,
  AtendimentoTypes,
} from './reducer';

const atendimentoTeste: moment.Moment = moment([2020, 9, 1, 9, 0]);

export default function getVerificaAtendimento(
  dispatch: (
    value: AtendimentoActions
  ) => void,
  data: moment.Moment,
): void {
  if (
    atendimentoTeste.isSame(data)
  ) {
    dispatch(
      {
        type:
          AtendimentoTypes.sucess,
        payload: {
          data: true,
        },
      },
    );
  } else {
    dispatch(
      {
        type:
          AtendimentoTypes.error,
        payload:
          '',
      },
    );
  }
}
