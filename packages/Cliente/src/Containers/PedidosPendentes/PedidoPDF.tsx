import React, { useEffect, useMemo } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import moment from 'moment';

import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';
import { useUsuarioContext } from '../../Context/Usuario';
import usePedidoProdutos from '../../Hooks/usePedidoProdutos';
import Logo from '../../Images/logo.png';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    border: '4px solid #FFC94A',
    backgroundColor: '#484848',
    color: '#FFC94A',
  },
  section: {
    marginBottom: '20px',
  },
  image: {
    width: '30px',
  },
});

interface IReport {
  pedido: IPedidoFuncionario;
}

const PedidosPendentesPedidoPDF: React.FC<IReport> = ({ pedido }: IReport) => {
  const {
    usuario: { id },
    resetDadosUsuario,
  } = useUsuarioContext();
  const { state, getPedidoProdutos } = usePedidoProdutos();

  useEffect(() => {
    if (id) {
      getPedidoProdutos(pedido.idatendimento, resetDadosUsuario);
    }
  }, [id, getPedidoProdutos, pedido.idatendimento, resetDadosUsuario]);

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
        <Image src={Logo} style={styles.image} />
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
        <Image src={Logo} style={styles.image} />
      </Page>
    </Document>
  );
};

export default PedidosPendentesPedidoPDF;
