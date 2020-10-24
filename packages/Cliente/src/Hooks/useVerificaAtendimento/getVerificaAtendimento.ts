import moment from 'moment';

import { VerificaAtendimentoRequestAPI } from '../../RequestAPI/Atendimento';
import { AtendimentoActions, AtendimentoTypes } from './reducer';

export default function getVerificaAtendimento(
  dispatch: (value: AtendimentoActions) => void,
  data: moment.Moment,
): void {
  function errorDispatch(): void {
    dispatch({
      type: AtendimentoTypes.error,
      payload: '',
    });
  }

  function sucessDispatch(retorno: boolean): void {
    dispatch({
      type: AtendimentoTypes.sucess,
      payload: {
        data: retorno,
      },
    });
  }

  VerificaAtendimentoRequestAPI(data.format('YYYY-MM-DD hh:mm'), errorDispatch, sucessDispatch);
}
