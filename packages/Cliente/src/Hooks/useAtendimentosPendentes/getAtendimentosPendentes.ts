import moment from 'moment';
import IAtendimentoPendente from '../../Interfaces/IAtendimentoPendente';

import {
  AtendimentosPendentesActions,
  AtendimentosPendentesTypes,
} from './reducer';

const datasListadas = [
  {
    idPedido: 1,
    dataPedido: moment([2020, 9, 19, 10, 0]),
    idCliente: 1,
    nomeCliente: 'Cliente 1',
  },
  {
    idPedido: 2,
    dataPedido: moment([2020, 9, 20, 10, 0]),
    idCliente: 2,
    nomeCliente: 'Cliente 2',
  },
  {
    idPedido: 3,
    dataPedido: moment([2020, 9, 20, 10, 30]),
    idCliente: 3,
    nomeCliente: 'Cliente 3',
  },
  {
    idPedido: 4,
    dataPedido: moment([2020, 9, 21, 9, 0]),
    idCliente: 4,
    nomeCliente: 'Cliente 4',
  },
  {
    idPedido: 5,
    dataPedido: moment([2020, 9, 21, 9, 30]),
    idCliente: 5,
    nomeCliente: 'Cliente 5',
  },
  {
    idPedido: 6,
    dataPedido: moment([2020, 9, 22, 9, 30]),
    idCliente: 6,
    nomeCliente: 'Cliente 6',
  },
  {
    idPedido: 7,
    dataPedido: moment([2020, 9, 23, 9, 30]),
    idCliente: 7,
    nomeCliente: 'Cliente 7',
  },
  {
    idPedido: 8,
    dataPedido: moment([2020, 9, 24, 9, 30]),
    idCliente: 8,
    nomeCliente: 'Cliente 8',
  },
];

function dataVerify(date: moment.Moment): IAtendimentoPendente[] {
  const datasRetornadas: IAtendimentoPendente[] = [];

  datasListadas.forEach((data) => {
    if (
      data.dataPedido.isSame(date, 'year')
      && data.dataPedido.isSame(date, 'month')
      && data.dataPedido.isSame(date, 'day')
    ) {
      datasRetornadas.push(data);
    }
  });

  return datasRetornadas;
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
