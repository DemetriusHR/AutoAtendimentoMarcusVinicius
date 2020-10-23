import { IProduto } from '..';

function comparaProduto(prevState: IProduto[], novoProduto: IProduto): boolean {
  let retornoComparacao = true;

  prevState.forEach((produto) => {
    if (
      produto.idProduto === novoProduto.idProduto
      && produto.detalhes === novoProduto.detalhes
    ) {
      retornoComparacao = false;
    }
  });

  return retornoComparacao;
}

export default comparaProduto;
