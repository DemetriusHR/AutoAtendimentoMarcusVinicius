import ActionMap from '../../Interfaces/ActionMap';

export const initialState = {
  progress:
    'initial',
  horario: false,
};

export interface IStateReducer {
  progress: string;
  horario: boolean;
}

export enum HorarioTypes {
  initial = 'VERIFICA_HORARIO',
  sucess = 'SUCESS_VERIFICA_HORARIO',
  error = 'ERROR_VERIFICA_HORARIO',
}

type HorarioPayload = {
  [HorarioTypes.initial]: '';
  [HorarioTypes.sucess]: {
    data: boolean;
  };
  [HorarioTypes.error]: '';
};

export type HorarioActions = ActionMap<
  HorarioPayload
>[keyof ActionMap<
  HorarioPayload
>];

export function reducer(
  state: IStateReducer,
  action: HorarioActions,
): IStateReducer {
  switch (
    action.type
  ) {
    case HorarioTypes.initial:
      return {
        ...state,
        progress:
          'initial',
      };
    case HorarioTypes.sucess:
      return {
        ...state,
        progress:
          'sucess',
        horario:
          action
            .payload
            .data,
      };
    case HorarioTypes.error:
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
