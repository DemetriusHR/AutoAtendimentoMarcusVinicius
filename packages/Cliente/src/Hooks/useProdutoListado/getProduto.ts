import { ProdutoActions, ProdutoTypes } from './reducer';
import IProduto from '../../Interfaces/IProdutoList';
import { ProdutoEspecificoRequestAPI } from '../../RequestAPI/Produto';

export default function getProdutos(
  dispatch: (value: ProdutoActions) => void,
  id: number,
): void {
  function errorDispatch(): void {
    dispatch({
      type: ProdutoTypes.error,
      payload: '',
    });
  }

  function sucessDispatch(retorno: IProduto): void {
    dispatch({
      type: ProdutoTypes.sucess,
      payload: {
        data: retorno,
      },
    });
  }

  ProdutoEspecificoRequestAPI(id, errorDispatch, sucessDispatch);
}
