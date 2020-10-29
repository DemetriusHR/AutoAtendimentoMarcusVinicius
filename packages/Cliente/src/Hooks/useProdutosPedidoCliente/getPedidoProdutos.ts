import IProduto from '../../Interfaces/IProdutoList';
import { ProdutoActions, ProdutosTypes } from './reducer';
import { PedidoPendenteClienteProdutosRequestAPI } from '../../RequestAPI/Produto';

export default function getPedidos(
  dispatch: (value: ProdutoActions) => void,
  idPedido: number,
  onLogin: () => void,
): void {
  function errorDispatch(): void {
    dispatch({
      type: ProdutosTypes.error,
      payload: '',
    });
  }

  function sucessDispatch(retorno: IProduto[]): void {
    dispatch({
      type: ProdutosTypes.sucess,
      payload: {
        data: retorno,
      },
    });
  }

  PedidoPendenteClienteProdutosRequestAPI(
    idPedido,
    errorDispatch,
    sucessDispatch,
    onLogin,
  );
}
