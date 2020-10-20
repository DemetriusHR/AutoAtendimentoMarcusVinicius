import IPedido from '../IPedido';

export default interface IPedidoFuncionario extends IPedido {
  idCliente: number;
  cliente: string;
  /* eslint-disable-next-line */
}
