import { ProdutoActions, ProdutosTypes } from './reducer';
import IProduto from '../../Interfaces/IProduto';

const produto: IProduto[] = [
  {
    idProduto: 1,
    nmProduto: 'Produto 1',
    detalhesProduto: 'Detalhes do detalhes',
  },
  {
    idProduto: 2,
    nmProduto: 'Produto 2',
    detalhesProduto: 'Detalhes do detalhes',
  },
];

export default function getPedidos(
  dispatch: (value: ProdutoActions) => void, idPedido: number,
): void {
  if (idPedido === 1) {
    dispatch({
      type: ProdutosTypes.sucess,
      payload: {
        data: produto,
      },
    });
  } else {
    dispatch({
      type: ProdutosTypes.error,
      payload: '',
    });
  }
}
