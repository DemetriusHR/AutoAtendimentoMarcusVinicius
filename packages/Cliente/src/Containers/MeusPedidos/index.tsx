import React, {
  useEffect,
} from 'react';
import styled from 'styled-components';

import Card from '../../Components/Card';
import usePedidosCliente from '../../Hooks/usePedidosCliente';
import PedidoComponent from './Components/Pedido';

const TextNotFound = styled.span`
  color: var(
    --text-not-found-color
  );
`;

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
          state.pedidos.map(
            (
              pedido,
            ) => (
              <PedidoComponent
                key={
                  `${pedido.dataPedido}`
                }
                pedido={
                  pedido
                }
              />
            ),
          )
        ) : (
          <TextNotFound>
            Não
            há
            pedidos
            pendentes
          </TextNotFound>
        )}
    </Card>
  );
};

export default MeusPedidosContainer;
