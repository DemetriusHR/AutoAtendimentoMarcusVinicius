import { ProdutoActions, ProdutosTypes } from './reducer';
import IProduto from '../../Interfaces/IProdutoList';

const produto: IProduto[] = [
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
): void {
  dispatch({
    type: ProdutosTypes.sucess,
    payload: {
      data: produto,
    },
  });
}
