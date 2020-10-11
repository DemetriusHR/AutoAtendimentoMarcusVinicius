import ActionMap from '../../Interfaces/ActionMap';
import IPedido from '../../Interfaces/IPedido';

export const initialState = {
  progress:
    'initial',
  pedidos: [],
};

export interface IStateReducer {
  progress: string;
  pedidos: IPedido[];
}

export enum PedidosTypes {
  initial = 'BUSCA_PEDIDOS',
  sucess = 'SUCESS_BUSCA_PEDIDOS',
  error = 'ERROR_BUSCA_PEDIDOS',
}

type PedidosPayload = {
  [PedidosTypes.initial]: '';
  [PedidosTypes.sucess]: {
    data: IPedido[];
  };
  [PedidosTypes.error]: '';
};

export type PedidosActions = ActionMap<
  PedidosPayload
>[keyof ActionMap<
  PedidosPayload
>];

export function reducer(
  state: IStateReducer,
  action: PedidosActions,
): IStateReducer {
  switch (
    action.type
  ) {
    case PedidosTypes.initial:
      return {
        ...state,
        progress:
          'initial',
      };
    case PedidosTypes.sucess:
      return {
        ...state,
        progress:
          'sucess',
        pedidos:
          action
            .payload
            .data,
      };
    case PedidosTypes.error:
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
