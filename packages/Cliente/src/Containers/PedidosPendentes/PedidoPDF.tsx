import React, { useEffect, useMemo } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import moment from 'moment';

import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';
import { useUsuarioContext } from '../../Context/Usuario';
import usePedidoProdutos from '../../Hooks/usePedidoProdutos';

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
  pedido: IPedidoFuncionario;
}

const PedidosPendentesPedidoPDF: React.FC<IReport> = ({ pedido }: IReport) => {
  const { resetDadosUsuario } = useUsuarioContext();
  const { state, getPedidoProdutos } = usePedidoProdutos();

  useEffect(() => {
    getPedidoProdutos(pedido.idatendimento, resetDadosUsuario);
  }, [getPedidoProdutos, pedido.idatendimento, resetDadosUsuario]);

  const data = useMemo(() => {
    const retorno = moment(pedido.dtpedido).format('DD/MM');

    return retorno;
  }, [pedido.dtpedido]);

  const horario = useMemo(() => {
    const retorno = moment(pedido.dtpedido).format('hh:mm');

    return retorno;
  }, [pedido.dtpedido]);

  const status = useMemo(() => {
    let retorno = '';
    if (pedido.entregue) {
      retorno = 'Não Devolvido X';
    } else {
      retorno = 'Não Entregue X';
    }

    return retorno;
  }, [pedido.entregue]);

  return state.progress === 'sucess' ? (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.section}>
          <Text>{`Data: ${data}`}</Text>
        </View>
        <View style={styles.section}>
          <Text>{`Horário: ${horario}`}</Text>
        </View>
        <View style={styles.section}>
          <Text>{`Status: ${status}`}</Text>
        </View>
        <View style={styles.section}>
          <Text>{`Cliente: ${pedido.nomecliente}`}</Text>
        </View>
        <View style={styles.section}>
          <Text>Produtos</Text>
        </View>
        {state.produtos.map((produto) => (
          <View key={produto.idproduto} style={styles.section}>
            <Text>
              {`Nome: ${produto.nmproduto} Detalhes: ${produto.detalhes}`}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  ) : (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.section}>
          <Text>{`Data: ${data}`}</Text>
        </View>
        <View style={styles.section}>
          <Text>{`Horário: ${horario}`}</Text>
        </View>
        <View style={styles.section}>
          <Text>{`Status: ${status}`}</Text>
        </View>
        <View style={styles.section}>
          <Text>{`Cliente: ${pedido.nomecliente}`}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PedidosPendentesPedidoPDF;
