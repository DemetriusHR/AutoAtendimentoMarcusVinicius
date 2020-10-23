import ActionMap from '../../Interfaces/ActionMap';
import IAtendimentoPendente from '../../Interfaces/IAtendimentoPendente';

export const initialState = {
  progress: 'initial',
  atendimentosPendentes: [],
};

export interface IStateReducer {
  progress: string;
  atendimentosPendentes: IAtendimentoPendente[];
}

export enum AtendimentosPendentesTypes {
  initial = 'ATENDIMENTOS_PENDENTES',
  sucess = 'SUCESS_ATENDIMENTOS_PENDENTES',
  error = 'ERROR_ATENDIMENTOS_PENDENTES',
}

type AtendimentosPendentesPayload = {
  [AtendimentosPendentesTypes.initial]: '';
  [AtendimentosPendentesTypes.sucess]: {
    data: IAtendimentoPendente[];
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
