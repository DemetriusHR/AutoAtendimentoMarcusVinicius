import IPedidoProduto from '../../../../../Interfaces/IPedidoProduto';

function comparaProduto(prevState: IPedidoProduto[], novoProduto: IPedidoProduto): boolean {
  let retornoComparacao = true;

  prevState.forEach((produto) => {
    if (
      produto.idProduto === novoProduto.idProduto
      && produto.id === novoProduto.id
      && produto.detalhes === novoProduto.detalhes
    ) {
      retornoComparacao = false;
    }
  });

  return retornoComparacao;
}

export default comparaProduto;
