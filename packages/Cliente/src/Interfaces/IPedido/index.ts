/* eslint semi: ["error", "never"] */

export default interface IPedido {
  idatendimento: number,
  dtpedido: moment.Moment;
  entregue: boolean;
  devolvido: boolean;
}
