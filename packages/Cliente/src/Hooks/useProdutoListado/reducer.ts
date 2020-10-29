import ActionMap from '../../Interfaces/ActionMap';
import IProduto from '../../Interfaces/IProdutoList';

export const initialState = {
  progress: 'initial',
  produto: {
    idproduto: 0,
    nmproduto: '',
  },
};

export interface IStateReducer {
  progress: string;
  produto: IProduto;
}

export enum ProdutoTypes {
  initial = 'BUSCA_PRODUTO',
  sucess = 'SUCESS_BUSCA_PRODUTO',
  error = 'ERROR_BUSCA_PRODUTO',
}

type ProdutoPayload = {
  [ProdutoTypes.initial]: '';
  [ProdutoTypes.sucess]: {
    data: IProduto;
  };
  [ProdutoTypes.error]: '';
};

export type ProdutoActions = ActionMap<ProdutoPayload>[keyof ActionMap<
  ProdutoPayload
>];

export function reducer(
  state: IStateReducer,
  action: ProdutoActions,
): IStateReducer {
  switch (action.type) {
    case ProdutoTypes.initial:
      return {
        ...state,
        progress: 'initial',
      };
    case ProdutoTypes.sucess:
      return {
        ...state,
        progress: 'sucess',
        produto: action.payload.data,
      };
    case ProdutoTypes.error:
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
