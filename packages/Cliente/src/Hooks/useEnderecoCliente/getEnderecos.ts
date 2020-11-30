import IEndereco from '../../Interfaces/IEndereco';
import { EnderecosUsuarioRequestAPI } from '../../RequestAPI/Endereco';

import { EnderecoActions, EnderecoTypes } from './reducer';

export default function getEnderecos(
  dispatch: (value: EnderecoActions) => void,
  idEndereco: number,
  onLogin: () => void,
): void {
  function errorDispatch(): void {
    dispatch({
      type: EnderecoTypes.error,
      payload: '',
    });
  }

  function sucessDispatch(retorno: IEndereco[]): void {
    dispatch({
      type: EnderecoTypes.sucess,
      payload: {
        data: retorno,
      },
    });
  }

  EnderecosUsuarioRequestAPI(
    idEndereco,
    errorDispatch,
    sucessDispatch,
    onLogin,
  );
}
