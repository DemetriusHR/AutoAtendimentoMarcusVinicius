/* eslint semi: ["error", "never"] */

export default interface IPedido {
  idPedido: number,
  dataPedido: Date;
  dataEntrega: Date | null;
  dataDevolucao: Date | null;
}
