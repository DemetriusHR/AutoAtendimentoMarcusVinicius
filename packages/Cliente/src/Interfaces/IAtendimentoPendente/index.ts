import moment from 'moment';

interface IAtendimentoPendente {
  idPedido: number;
  dataPedido: moment.Moment;
  idCliente: number;
  nomeCliente: string;
}

export default IAtendimentoPendente;
