import {
  UsuarioActions,
  UsuarioTypes,
} from './reducer';

export default function getVerificaUsuario(
  dispatch: (
    value: UsuarioActions
  ) => void,
): void {
  const funcionario = localStorage.getItem('funcionario');
  if (funcionario?.length && funcionario === 'true') {
    dispatch(
      {
        type:
          UsuarioTypes.sucess,
        payload: {
          data: {
            funcionario: true,
          },
        },
      },
    );
  } else {
    dispatch(
      {
        type:
          UsuarioTypes.sucess,
        payload: {
          data: {
            funcionario: false,
          },
        },
      },
    );
  }
}
