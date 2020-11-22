import React, { useCallback, useEffect, useState } from 'react';
import Collapse from 'antd/lib/collapse';
import Modal from 'antd/lib/modal';
import styled from 'styled-components';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import { PDFViewer } from '@react-pdf/renderer';

import PedidoPendenteProduto from './PedidoPendenteProduto';
import PedidoPanelComponent from './Components/PedidoPanel';
import Card from '../../Components/Card';
import CustomScroll from '../../Components/CustomScroll';
import usePedidosFuncionario from '../../Hooks/usePedidosFuncionario';
import { useUsuarioContext } from '../../Context/Usuario';
import PedidoPendenteEndereco from './PedidoPendenteEndereco';
import PedidosPendentesPedidoPDF from './PedidoPDF';
import PedidosPendentesPedidosPDF from './PedidosPDF';

const TextNotFound = styled.span`
  color: var(--text-not-found-color);
`;

const PedidosPendentesContainer: React.FC = () => {
  const [modal, setModal] = useState(false);
  const {
    usuario: { id },
    resetDadosUsuario,
  } = useUsuarioContext();
  const { state, getPedidos } = usePedidosFuncionario();

  useEffect(() => {
    if (id) {
      getPedidos(resetDadosUsuario);
    }
  }, [getPedidos, id, resetDadosUsuario]);

  const modalVisible = useCallback(() => {
    setModal(true);
  }, []);

  const modalUnvisible = useCallback(() => {
    setModal(false);
  }, []);

  return (
    <Card>
      <CustomScroll className="max-h-full h-64">
        {state.pedidos.length ? (
          <div>
            <button type="button" onClick={modalVisible}>
              <FilePdfOutlined translate="span" />
            </button>
            <Collapse bordered={false} className="pedido-collapse">
              {state.pedidos.map((pedido) => (
                <Collapse.Panel
                  key={pedido.idatendimento}
                  header={<PedidoPanelComponent pedido={pedido} />}
                  className="pedido-collapse-panel"
                >
                  <button type="button" onClick={modalVisible}>
                    <FilePdfOutlined translate="span" />
                  </button>
                  <p className="text-lg">Informações sobre o Cliente</p>
                  <p className="text-sm m-0">{`Celular: ${pedido.celcliente}`}</p>
                  <PedidoPendenteEndereco idCliente={pedido.idcliente} />
                  <PedidoPendenteProduto idPedido={pedido.idatendimento} />
                  <Modal
                    visible={modal}
                    onCancel={modalUnvisible}
                    footer={null}
                    destroyOnClose
                    className="h-56"
                  >
                    <div className="pt-6">
                      <PDFViewer style={{ width: '100%', height: '16rem' }}>
                        <PedidosPendentesPedidoPDF pedido={pedido} />
                      </PDFViewer>
                    </div>
                  </Modal>
                </Collapse.Panel>
              ))}
            </Collapse>
            <Modal
              visible={modal}
              onCancel={modalUnvisible}
              footer={null}
              destroyOnClose
              className="h-56"
            >
              <div className="pt-6">
                <PDFViewer style={{ width: '100%', height: '16rem' }}>
                  <PedidosPendentesPedidosPDF pedidos={state.pedidos} />
                </PDFViewer>
              </div>
            </Modal>
          </div>
        ) : (
          <TextNotFound>Não há pedidos pendentes</TextNotFound>
        )}
      </CustomScroll>
    </Card>
  );
};

export default PedidosPendentesContainer;
