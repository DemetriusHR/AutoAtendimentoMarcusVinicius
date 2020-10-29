import React, { useEffect } from 'react';
import styled from 'styled-components';

import Card from '../../Components/Card';
import { useUsuarioContext } from '../../Context/Usuario';
import usePedidosCliente from '../../Hooks/usePedidosCliente';
import MeusPedidosPedido from './Pedido';

const TextNotFound = styled.span`
  color: var(--text-not-found-color);
`;

const MeusPedidosContainer: React.FC = () => {
  const {
    usuario: { id },
    resetDadosUsuario,
  } = useUsuarioContext();
  const { state, getPedidos } = usePedidosCliente();

  useEffect(() => {
    getPedidos(id, resetDadosUsuario);
  }, [getPedidos, id, resetDadosUsuario]);
  return (
    <Card>
      {state.pedidos.length ? (
        state.pedidos.map((pedido) => (
          <MeusPedidosPedido key={pedido.idatendimento} pedido={pedido} />
        ))
      ) : (
        <TextNotFound>Não há pedidos pendentes</TextNotFound>
      )}
    </Card>
  );
};

export default MeusPedidosContainer;
