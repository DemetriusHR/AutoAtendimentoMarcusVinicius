import IPedido from '../IPedido';

export default interface IPedidoFuncionario extends IPedido {
  idcliente: number;
  nomecliente: string;
  celcliente: string;
  /* eslint-disable-next-line */
}
