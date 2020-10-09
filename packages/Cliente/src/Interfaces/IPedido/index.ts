export default interface IPedido {
  dataPedido: Date;
  dataEntrega: Date | null;
  dataDevolucao: Date | null;
}
