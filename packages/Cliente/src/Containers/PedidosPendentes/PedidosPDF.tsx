import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import moment from 'moment';

import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
    border: '1px solid #eaeaea',
  },
  section: {
    flexGrow: 1,
  },
  section1: {
    flexGrow: 1,
    borderBottom: '1px solid #eaeaea',
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
            <View style={styles.section1}>
              <Text>{`Cliente: ${pedido.nomecliente}`}</Text>
            </View>
          </>
        );
      })}
    </Page>
  </Document>
);

export default PedidosPendentesPedidosPDF;
