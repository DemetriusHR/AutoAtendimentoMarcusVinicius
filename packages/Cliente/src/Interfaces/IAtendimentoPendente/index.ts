import moment from 'moment';

interface IAtendimentoPendente {
  idatendimento: number;
  dataatendimento: moment.Moment;
  idcliente: number;
  nomecliente: string;
}

export default IAtendimentoPendente;
