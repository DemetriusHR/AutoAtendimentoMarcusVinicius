import ActionMap from '../../Interfaces/ActionMap';

export const initialState = {
  progress: 'initial',
  atendimento: false,
};

export interface IStateReducer {
  progress: string;
  atendimento: boolean;
}

export enum AtendimentoTypes {
  initial = 'VERIFICA_ATENDIMENTO',
  sucess = 'SUCESS_VERIFICA_ATENDIMENTO',
  error = 'ERROR_VERIFICA_ATENDIMENTO',
}

type AtendimentoPayload = {
  [AtendimentoTypes.initial]: '';
  [AtendimentoTypes.sucess]: {
    data: boolean;
  };
  [AtendimentoTypes.error]: '';
};

export type AtendimentoActions = ActionMap<AtendimentoPayload>[keyof ActionMap<
  AtendimentoPayload
>];

export function reducer(
  state: IStateReducer,
  action: AtendimentoActions,
): IStateReducer {
  switch (action.type) {
    case AtendimentoTypes.initial:
      return {
        ...state,
        progress: 'initial',
      };
    case AtendimentoTypes.sucess:
      return {
        ...state,
        progress: 'sucess',
        atendimento: action.payload.data,
      };
    case AtendimentoTypes.error:
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
