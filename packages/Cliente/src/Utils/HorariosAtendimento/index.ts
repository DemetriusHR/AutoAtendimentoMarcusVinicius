import moment from 'moment';
import IHorarios from '../../Interfaces/IHorarios';

function novaData(
  data: moment.Moment,
  horas: number,
  minutos: number,
): moment.Moment {
  const dataRetornada = moment([
    data.year(),
    data.month(),
    data.date(),
    horas,
    minutos,
  ]);

  return dataRetornada;
}

function horariosDiaNormal(data: moment.Moment): IHorarios[] {
  return [
    {
      key: 1,
      data: novaData(data, 9, 0),
      horarioInicial: '09:00',
      horarioFinal: '09:29',
    },
    {
      key: 2,
      data: novaData(data, 9, 30),
      horarioInicial: '09:30',
      horarioFinal: '09:59',
    },
    {
      key: 3,
      data: novaData(data, 10, 0),
      horarioInicial: '10:00',
      horarioFinal: '10:29',
    },
    {
      key: 4,
      data: novaData(data, 10, 30),
      horarioInicial: '10:30',
      horarioFinal: '10:59',
    },
    {
      key: 5,
      data: novaData(data, 11, 0),
      horarioInicial: '11:00',
      horarioFinal: '11:29',
    },
    {
      key: 6,
      data: novaData(data, 11, 30),
      horarioInicial: '11:30',
      horarioFinal: '11:59',
    },
    {
      key: 7,
      data: novaData(data, 14, 0),
      horarioInicial: '14:00',
      horarioFinal: '14:29',
    },
    {
      key: 8,
      data: novaData(data, 14, 30),
      horarioInicial: '14:30',
      horarioFinal: '14:59',
    },
    {
      key: 9,
      data: novaData(data, 15, 0),
      horarioInicial: '15:00',
      horarioFinal: '15:29',
    },
    {
      key: 10,
      data: novaData(data, 15, 30),
      horarioInicial: '15:30',
      horarioFinal: '15:59',
    },
    {
      key: 11,
      data: novaData(data, 16, 0),
      horarioInicial: '16:00',
      horarioFinal: '16:29',
    },
    {
      key: 12,
      data: novaData(data, 16, 30),
      horarioInicial: '16:30',
      horarioFinal: '16:59',
    },
    {
      key: 13,
      data: novaData(data, 17, 0),
      horarioInicial: '17:00',
      horarioFinal: '17:29',
    },
    {
      key: 14,
      data: novaData(data, 17, 30),
      horarioInicial: '17:30',
      horarioFinal: '17:59',
    },
  ];
}

function horariosDiaSabado(data: moment.Moment): IHorarios[] {
  return [
    {
      key: 1,
      data: novaData(data, 9, 0),
      horarioInicial: '09:00',
      horarioFinal: '09:29',
    },
    {
      key: 2,
      data: novaData(data, 9, 30),
      horarioInicial: '09:30',
      horarioFinal: '09:59',
    },
    {
      key: 3,
      data: novaData(data, 10, 0),
      horarioInicial: '10:00',
      horarioFinal: '10:29',
    },
    {
      key: 4,
      data: novaData(data, 10, 30),
      horarioInicial: '10:30',
      horarioFinal: '10:59',
    },
    {
      key: 5,
      data: novaData(data, 11, 0),
      horarioInicial: '11:00',
      horarioFinal: '11:29',
    },
    {
      key: 6,
      data: novaData(data, 11, 30),
      horarioInicial: '11:30',
      horarioFinal: '11:59',
    },
    {
      key: 7,
      data: novaData(data, 12, 0),
      horarioInicial: '12:00',
      horarioFinal: '12:29',
    },
    {
      key: 8,
      data: novaData(data, 12, 30),
      horarioInicial: '12:30',
      horarioFinal: '12:59',
    },
  ];
}

export { horariosDiaNormal, horariosDiaSabado };
