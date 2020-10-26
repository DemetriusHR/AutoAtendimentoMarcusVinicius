import moment from 'moment';
import IAtendimentoPendente from '../../Interfaces/IAtendimentoPendente';
import { AtendimentosPendentesRequestAPI } from '../../RequestAPI/Atendimento';

import {
  AtendimentosPendentesActions,
  AtendimentosPendentesTypes,
} from './reducer';

export default function getAtendimentosPendentes(
  dispatch: (value: AtendimentosPendentesActions) => void,
  data: moment.Moment,
): void {
  function errorDispatch(): void {
    dispatch({
      type: AtendimentosPendentesTypes.error,
      payload: '',
    });
  }

  function sucessDispatch(retorno: IAtendimentoPendente[]): void {
    dispatch({
      type: AtendimentosPendentesTypes.sucess,
      payload: {
        data: retorno,
      },
    });
  }

  AtendimentosPendentesRequestAPI(data.format('YYYY-MM-DD'), '09:00', '18:00', errorDispatch, sucessDispatch);
}
