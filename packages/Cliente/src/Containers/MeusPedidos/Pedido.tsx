import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import moment from 'moment';
import styled from 'styled-components';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import Modal from 'antd/lib/modal';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

import IPedido from '../../Interfaces/IPedido';
import useProdutosPedidoCliente from '../../Hooks/useProdutosPedidoCliente';
import { useUsuarioContext } from '../../Context/Usuario';
import IProdutoList from '../../Interfaces/IProdutoList';

const TextStatus = styled.span`
  color: var(--error-color);
`;

interface IMeusPedidosPedido {
  pedido: IPedido;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
    border: '1px solid #eaeaea',
  },
  section: {
    flexGrow: 1,
  },
});

interface IReport {
  data: string;
  horario: string;
  produtos: IProdutoList[];
  status: string;
}

const Report: React.FC<IReport> = ({
  data,
  horario,
  produtos,
  status,
}: IReport) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <View style={styles.section}>
        <Text>{`Data: ${data}`}</Text>
      </View>
      <View style={styles.section}>
        <Text>{`Horário: ${horario}`}</Text>
      </View>
      <View style={styles.section}>
        <Text>
          {`Produtos: ${produtos.map((produto) => `${produto.nmproduto}, `)}`}
        </Text>
      </View>
      <View style={styles.section}>
        <Text>{`Status: ${status}`}</Text>
      </View>
    </Page>
  </Document>
);

const MeusPedidosPedido: React.FC<IMeusPedidosPedido> = ({
  pedido: { idatendimento, dtpedido, entregue },
}: IMeusPedidosPedido) => {
  const [modal, setModal] = useState(false);
  const { resetDadosUsuario } = useUsuarioContext();
  const { state, getPedidoProdutos } = useProdutosPedidoCliente();

  useEffect(() => {
    getPedidoProdutos(idatendimento, resetDadosUsuario);
  }, [idatendimento, getPedidoProdutos, resetDadosUsuario]);

  const modalVisible = useCallback(() => {
    setModal(true);
  }, []);

  const modalUnvisible = useCallback(() => {
    setModal(false);
  }, []);

  const data = useMemo(() => {
    const retorno = moment(dtpedido).format('DD/MM');

    return retorno;
  }, [dtpedido]);

  const horario = useMemo(() => {
    const retorno = moment(dtpedido).format('hh:mm');

    return retorno;
  }, [dtpedido]);

  const status = useMemo(() => {
    let retorno = '';
    if (entregue) {
      retorno = 'Não Devolvido X';
    } else {
      retorno = 'Não Entregue X';
    }

    return retorno;
  }, [entregue]);

  return (
    <div>
      <button type="button" onClick={modalVisible}>
        <FilePdfOutlined translate="span" />
      </button>
      <div className="flex justify-between text-lg">
        <div>
          <p className="m-0">{`Dia ${data}`}</p>
          <p className="m-0">{`Horário ${horario}`}</p>
        </div>
        <div className="max-w-4xl">
          <p className="m-0">Produtos: </p>
          {state.produtos.map((produto) => (
            <span key={produto.idproduto}>{`${produto.nmproduto} `}</span>
          ))}
        </div>
        <div>
          <p className="m-0">Status </p>
          <TextStatus>{status}</TextStatus>
        </div>
      </div>
      <Modal
        visible={modal}
        onCancel={modalUnvisible}
        footer={null}
        destroyOnClose
        className="h-56"
      >
        <div className="pt-6">
          <PDFViewer style={{ width: '100%', height: '16rem' }}>
            <Report
              data={data}
              horario={horario}
              produtos={state.produtos}
              status={status}
            />
          </PDFViewer>
        </div>
      </Modal>
    </div>
  );
};

export default MeusPedidosPedido;
