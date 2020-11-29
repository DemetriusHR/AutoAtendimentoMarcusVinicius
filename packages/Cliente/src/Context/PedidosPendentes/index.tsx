import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import usePedidosFuncionario from '../../Hooks/usePedidosFuncionario';
import { useUsuarioContext } from '../Usuario';
import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';

interface IPedidosPendentesContext {
  pedidos: IPedidoFuncionario[];
  getPedidos: () => void;
}

const initialValue: IPedidoFuncionario[] = [];

const PedidosPendentesContext = React.createContext<IPedidosPendentesContext>({
  pedidos: initialValue,
  getPedidos: () => null,
});

const usePedidosPendentesContext: () => IPedidosPendentesContext = () => {
  const context = useContext(PedidosPendentesContext);

  if (!context) {
    throw new Error(
      'usePedidosPendentesContext não funciona sem o PedidosPendentesProvider',
    );
  }

  return context;
};

const PedidosPendentesProvider: React.FC = React.memo(
  ({ children }: { children?: React.ReactNode }) => {
    const {
      usuario: { id },
      resetDadosUsuario,
    } = useUsuarioContext();
    const { state, getPedidos } = usePedidosFuncionario();

    const loadPedidos = useCallback(() => {
      getPedidos(resetDadosUsuario);
    }, [getPedidos, resetDadosUsuario]);

    useEffect(() => {
      if (id) {
        loadPedidos();
      }
    }, [loadPedidos, id]);

    const contextValue = useMemo(
      () => ({ pedidos: state.pedidos, getPedidos: loadPedidos }),
      [loadPedidos, state.pedidos],
    );

    return (
      <PedidosPendentesContext.Provider value={contextValue}>
        {children}
      </PedidosPendentesContext.Provider>
    );
  },
);

PedidosPendentesProvider.defaultProps = {
  children: <div />,
};

export { usePedidosPendentesContext };
export default PedidosPendentesProvider;
