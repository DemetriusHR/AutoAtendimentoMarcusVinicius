import React, { useEffect } from 'react';
import Collapse from 'antd/lib/collapse';
import styled from 'styled-components';

import PedidoPendenteProduto from './PedidoPendenteProduto';
import PedidoPanelComponent from './Components/PedidoPanel';
import Card from '../../Components/Card';
import CustomScroll from '../../Components/CustomScroll';
import usePedidosFuncionario from '../../Hooks/usePedidosFuncionario';
import { useUsuarioContext } from '../../Context/Usuario';
import PedidoPendenteEndereco from './PedidoPendenteEndereco';

const TextNotFound = styled.span`
  color: var(--text-not-found-color);
`;

const PedidosPendentesContainer: React.FC = () => {
  const { resetDadosUsuario } = useUsuarioContext();
  const { state, getPedidos } = usePedidosFuncionario();

  useEffect(() => {
    getPedidos(resetDadosUsuario);
  }, [getPedidos, resetDadosUsuario]);

  return (
    <Card>
      <CustomScroll className="max-h-full h-64">
        {state.pedidos.length ? (
          <Collapse bordered={false} className="pedido-collapse">
            {state.pedidos.map((pedido) => (
              <Collapse.Panel
                key={pedido.idatendimento}
                header={<PedidoPanelComponent pedido={pedido} />}
                className="pedido-collapse-panel"
              >
                <p className="text-lg">Informações sobre o Cliente</p>
                <p className="text-sm m-0">{`Celular: ${pedido.celcliente}`}</p>
                <PedidoPendenteEndereco idCliente={pedido.idcliente} />
                <PedidoPendenteProduto idPedido={pedido.idatendimento} />
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
