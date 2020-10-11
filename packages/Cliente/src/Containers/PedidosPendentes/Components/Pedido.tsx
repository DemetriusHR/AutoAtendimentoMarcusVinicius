import React, {
  useEffect,
} from 'react';
import Collapse from 'antd/lib/collapse';

import Card from '../../../Components/Card';
import usePedidosCliente from '../../../Hooks/usePedidosCliente';

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
          >
            <Collapse.Panel
              header="This is panel header 1"
              key="1"
              className="pedido-collapse-panel shadow"
            >
              <p>
                Teste
              </p>
            </Collapse.Panel>
            <Collapse.Panel
              header="This is panel header 2"
              key="2"
              className="pedido-collapse-panel shadow"
            >
              <p>
                Teste
              </p>
            </Collapse.Panel>
          </Collapse>
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
