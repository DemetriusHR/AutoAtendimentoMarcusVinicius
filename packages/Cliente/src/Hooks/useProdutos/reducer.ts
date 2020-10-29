import ActionMap from '../../Interfaces/ActionMap';
import IProduto from '../../Interfaces/IProdutoList';

export const initialState = {
  progress: 'initial',
  produtos: [],
};

export interface IStateReducer {
  progress: string;
  produtos: IProduto[];
}

export enum ProdutosTypes {
  initial = 'BUSCA_PRODUTOS',
  sucess = 'SUCESS_BUSCA_PRODUTOS',
  error = 'ERROR_BUSCA_PRODUTOS',
}

type ProdutoPayload = {
  [ProdutosTypes.initial]: '';
  [ProdutosTypes.sucess]: {
    data: IProduto[];
  };
  [ProdutosTypes.error]: '';
};

export type ProdutoActions = ActionMap<ProdutoPayload>[keyof ActionMap<
  ProdutoPayload
>];

export function reducer(
  state: IStateReducer,
  action: ProdutoActions,
): IStateReducer {
  switch (action.type) {
    case ProdutosTypes.initial:
      return {
        ...state,
        progress: 'initial',
      };
    case ProdutosTypes.sucess:
      return {
        ...state,
        progress: 'sucess',
        produtos: action.payload.data,
      };
    case ProdutosTypes.error:
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
