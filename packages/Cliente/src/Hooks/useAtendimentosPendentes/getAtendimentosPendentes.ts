import moment from 'moment';

import {
  AtendimentosPendentesActions,
  AtendimentosPendentesTypes,
} from './reducer';

const datasListadas = [
  moment([2020, 9, 19, 10, 0]),
  moment([2020, 9, 20, 10, 0]),
  moment([2020, 9, 20, 10, 30]),
  moment([2020, 9, 21, 9, 0]),
  moment([2020, 9, 21, 9, 30]),
  moment([2020, 9, 22, 9, 30]),
  moment([2020, 9, 23, 9, 30]),
  moment([2020, 9, 24, 9, 30]),
];

function dataVerify(date: moment.Moment): number {
  const datasRetornadas: moment.Moment[] = [];

  datasListadas.forEach((data) => {
    if (
      data.isSame(date, 'day')
      && data.isSame(date, 'month')
      && data.isSame(date, 'year')
    ) {
      datasRetornadas.push(data);
    }
  });

  return datasRetornadas.length;
}

export default function getAtendimentosPendentes(
  dispatch: (value: AtendimentosPendentesActions) => void,
  data: moment.Moment,
): void {
  const atendimentosNumero = dataVerify(data);

  dispatch({
    type: AtendimentosPendentesTypes.sucess,
    payload: {
      data: atendimentosNumero,
    },
  });
}
