import { ProdutoActions, ProdutosTypes } from './reducer';
import { ProdutosRequestAPI } from '../../RequestAPI/Produto';
import IProdutoList from '../../Interfaces/IProdutoList';

export default function getProdutos(
  dispatch: (value: ProdutoActions) => void,
): void {
  function errorDispatch(): void {
    dispatch({
      type: ProdutosTypes.error,
      payload: '',
    });
  }

  function sucessDispatch(retorno: IProdutoList[]): void {
    dispatch({
      type: ProdutosTypes.sucess,
      payload: {
        data: retorno,
      },
    });
  }

  ProdutosRequestAPI(errorDispatch, sucessDispatch);
}
