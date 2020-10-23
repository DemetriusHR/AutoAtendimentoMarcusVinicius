import ActionMap from '../../Interfaces/ActionMap';

export const initialState = {
  progress:
    'initial',
  usuario: {
    funcionario: false,
  },
};

export interface IStateReducer {
  progress: string;
  usuario: {
    funcionario: boolean;
  };
}

export enum UsuarioTypes {
  initial = 'VERIFICA_USUARIO',
  sucess = 'SUCESS_VERIFICA_USUARIO',
  error = 'ERROR_VERIFICA_USUARIO',
}

type UsuarioPayload = {
  [UsuarioTypes.initial]: '';
  [UsuarioTypes.sucess]: {
    data: {
      funcionario: boolean;
    };
  };
  [UsuarioTypes.error]: '';
};

export type UsuarioActions = ActionMap<
  UsuarioPayload
>[keyof ActionMap<
  UsuarioPayload
>];

export function reducer(
  state: IStateReducer,
  action: UsuarioActions,
): IStateReducer {
  switch (
    action.type
  ) {
    case UsuarioTypes.initial:
      return {
        ...state,
        progress:
          'initial',
      };
    case UsuarioTypes.sucess:
      return {
        ...state,
        progress:
          'sucess',
        usuario:
          action
            .payload
            .data,
      };
    case UsuarioTypes.error:
      return {
        ...state,
        progress:
          'error',
      };
    default:
      return {
        ...state,
      };
  }
}
