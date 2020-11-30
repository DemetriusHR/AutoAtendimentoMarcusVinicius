import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer';

import IProdutoList from '../../Interfaces/IProdutoList';
import Logo from '../../Images/logo.png';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    border: '4px solid #FFC94A',
    backgroundColor: '#484848',
    color: '#FFC94A',
  },
  sectionFlex: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '15px',
  },
  section: {
    flexGrow: 1,
  },
  produto: {
    padding: '5px 0',
  },
  viewSeparation: {
    marginBottom: '15px',
  },
  viewSeparationUt: {
    marginBottom: '60px',
  },
  image: {
    width: '30px',
  },
});

interface IReport {
  data: string;
  horario: string;
  produtos: IProdutoList[];
  status: string;
}

const MeusPedidosReport: React.FC<IReport> = ({
  data,
  horario,
  produtos,
  status,
}: IReport) => (
  <PDFViewer style={{ width: '100%', height: '16rem' }}>
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.sectionFlex}>
          <View style={styles.section}>
            <Text>Data</Text>
            <Text>{data}</Text>
          </View>
          <View style={styles.section}>
            <Text>Horário</Text>
            <Text>{horario}</Text>
          </View>
        </View>
        <View style={styles.viewSeparation}>
          <Text>Produtos</Text>
          {produtos.map((produto) => (
            <Text key={produto.idproduto} style={styles.produtos}>
              {produto.nmproduto}
            </Text>
          ))}
        </View>
        <View style={styles.viewSeparationUt}>
          <Text>Status</Text>
          <Text>{status}</Text>
        </View>
        <Image src={Logo} style={styles.image} />
      </Page>
    </Document>
  </PDFViewer>
);

export default MeusPedidosReport;
