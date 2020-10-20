import ActionMap from '../../Interfaces/ActionMap';

export const initialState = {
  progress: 'initial',
  atendimentosPendentes: 0,
};

export interface IStateReducer {
  progress: string;
  atendimentosPendentes: number;
}

export enum AtendimentosPendentesTypes {
  initial = 'ATENDIMENTOS_PENDENTES',
  sucess = 'SUCESS_ATENDIMENTOS_PENDENTES',
  error = 'ERROR_ATENDIMENTOS_PENDENTES',
}

type AtendimentosPendentesPayload = {
  [AtendimentosPendentesTypes.initial]: '';
  [AtendimentosPendentesTypes.sucess]: {
    data: number;
  };
  [AtendimentosPendentesTypes.error]: '';
};

export type AtendimentosPendentesActions = ActionMap<
  AtendimentosPendentesPayload
>[keyof ActionMap<AtendimentosPendentesPayload>];

export function reducer(
  state: IStateReducer,
  action: AtendimentosPendentesActions,
): IStateReducer {
  switch (action.type) {
    case AtendimentosPendentesTypes.initial:
      return {
        ...state,
        progress: 'initial',
      };
    case AtendimentosPendentesTypes.sucess:
      return {
        ...state,
        progress: 'sucess',
        atendimentosPendentes: action.payload.data,
      };
    case AtendimentosPendentesTypes.error:
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
