import React, { useEffect } from 'react';
import Collapse from 'antd/lib/collapse';
import styled from 'styled-components';

import PedidoPendenteProduto from './PedidoPendenteProduto';
import PedidoPanelComponent from './Components/PedidoPanel';
import Card from '../../Components/Card';
import CustomScroll from '../../Components/CustomScroll';
import usePedidosFuncionario from '../../Hooks/usePedidosFuncionario';

const TextNotFound = styled.span`
  color: var(--text-not-found-color);
`;

const PedidosPendentesContainer: React.FC = () => {
  const { state, getPedidos } = usePedidosFuncionario();

  useEffect(() => {
    getPedidos();
  }, [getPedidos]);
  return (
    <Card>
      <CustomScroll className="max-h-full h-64">
        {state.pedidos.length ? (
          <Collapse bordered={false} className="pedido-collapse">
            {state.pedidos.map((pedido) => (
              <Collapse.Panel
                key={pedido.idCliente}
                header={<PedidoPanelComponent pedido={pedido} />}
                className="pedido-collapse-panel"
              >
                <PedidoPendenteProduto idPedido={pedido.idPedido} />
              </Collapse.Panel>
            ))}
          </Collapse>
        ) : (
          <TextNotFound>Não há pedidos pendentes</TextNotFound>
        )}
      </CustomScroll>
    </Card>
  );
};

export default PedidosPendentesContainer;
