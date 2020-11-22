import React, { useEffect } from 'react';
import styled from 'styled-components';

import MeusPedidosPedido from './Pedido';
import Card from '../../Components/Card';
import CustomScroll from '../../Components/CustomScroll';
import usePedidosCliente from '../../Hooks/usePedidosCliente';
import { useUsuarioContext } from '../../Context/Usuario';

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
    if (id) {
      getPedidos(id, resetDadosUsuario);
    }
  }, [getPedidos, id, resetDadosUsuario]);

  return (
    <div>
      {state.pedidos.length ? (
        <CustomScroll className="max-h-full h-64">
          {state.pedidos.map((pedido) => (
            <Card>
              <MeusPedidosPedido key={pedido.idatendimento} pedido={pedido} />
            </Card>
          ))}
        </CustomScroll>
      ) : (
        <Card>
          <TextNotFound>Não há pedidos pendentes</TextNotFound>
        </Card>
      )}
    </div>
  );
};

export default MeusPedidosContainer;
