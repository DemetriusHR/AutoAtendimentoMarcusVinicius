import { ProdutoActions, ProdutoTypes } from './reducer';
import IProduto from '../../Interfaces/IProdutoList';

const produtos: IProduto[] = [
  {
    idProduto: 1,
    nmProduto: 'Produto 1',
  },
  {
    idProduto: 2,
    nmProduto: 'Produto 2',
  },
];

export default function getProdutos(
  dispatch: (value: ProdutoActions) => void,
  id: number,
): void {
  let produtoRetornado: IProduto = {
    idProduto: 0,
    nmProduto: '',
  };

  produtos.forEach((produto) => {
    console.log(produto, id);
    if (produto.idProduto === id) {
      produtoRetornado = produto;
    }
  });

  dispatch({
    type: ProdutoTypes.sucess,
    payload: {
      data: produtoRetornado,
    },
  });
}
