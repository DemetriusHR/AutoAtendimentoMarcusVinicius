import { ProdutoActions, ProdutosTypes } from './reducer';
import IProduto from '../../Interfaces/IProduto';

const produto: IProduto[] = [
  {
    idproduto: 1,
    nmproduto: 'Produto 1',
    detalhesProduto: 'Detalhes do detalhes',
  },
  {
    idproduto: 2,
    nmproduto: 'Produto 2',
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
