import React, {
  useEffect,
} from 'react';
import Collapse from 'antd/lib/collapse';

import Card from '../../Components/Card';
import usePedidosCliente from '../../Hooks/usePedidosCliente';

const MeusPedidosContainer: React.FC = () => {
  const {
    state,
    getPedidos,
  } = usePedidosCliente();

  useEffect(() => {
    getPedidos();
  }, [
    getPedidos,
  ]);
  return (
    <Card>
      {state
        .pedidos
        .length ? (
          <Collapse
            ghost
            className="pedido-collapse"
          />
        ) : (
          <span>
            Não
            há
            pedidos
            pendentes
          </span>
        )}
    </Card>
  );
};

export default MeusPedidosContainer;
