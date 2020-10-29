import ActionMap from '../../Interfaces/ActionMap';
import IEndereco from '../../Interfaces/IEndereco';

export const initialState = {
  progress: 'initial',
  enderecos: [],
};

export interface IStateReducer {
  progress: string;
  enderecos: IEndereco[];
}

export enum EnderecoTypes {
  initial = 'ENDERECO',
  sucess = 'SUCESS_ENDERECO',
  error = 'ERROR_ENDERECO',
}

type EnderecoPayload = {
  [EnderecoTypes.initial]: '';
  [EnderecoTypes.sucess]: {
    data: IEndereco[];
  };
  [EnderecoTypes.error]: '';
};

export type EnderecoActions = ActionMap<EnderecoPayload>[keyof ActionMap<
  EnderecoPayload
>];

export function reducer(
  state: IStateReducer,
  action: EnderecoActions,
): IStateReducer {
  switch (action.type) {
    case EnderecoTypes.initial:
      return {
        ...state,
        progress: 'initial',
      };
    case EnderecoTypes.sucess:
      return {
        ...state,
        progress: 'sucess',
        enderecos: action.payload.data,
      };
    case EnderecoTypes.error:
      return {
        ...state,
        progress: 'error',
      };
    default:
      return {
        ...state,
      };
  }
}
