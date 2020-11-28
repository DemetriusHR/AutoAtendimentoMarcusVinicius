import React from 'react';
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
  section1: {
    width: '100%',
    borderBottom: '3px dashed #eaeaea',
    marginBottom: '30px',
  },
  image: {
    width: '30px',
  },
});

interface IReport {
  pedidos: IPedidoFuncionario[];
}

const PedidosPendentesPedidosPDF: React.FC<IReport> = ({
  pedidos,
}: IReport) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {pedidos.map((pedido) => {
        const data = moment(pedido.dtpedido).format('DD/MM');

        const horario = moment(pedido.dtpedido).format('hh:mm');

        const status = pedido.entregue ? 'Não Devolvido X' : 'Não Entregue X';

        return (
          <>
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
            <View style={styles.section1}>
              <Image src={Logo} style={styles.image} />
            </View>
          </>
        );
      })}
    </Page>
  </Document>
);

export default PedidosPendentesPedidosPDF;
