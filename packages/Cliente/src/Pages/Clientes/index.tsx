import React from 'react';

import PageWrapper from '../../Components/PageWrapper';
import TitleComponent from '../../Components/Title';
import AtendimentosClienteContainer from '../../Containers/AtendimentosCliente';
import MeusPedidosContainer from '../../Containers/MeusPedidos';

const ClientesPage: React.FC = () => (
  <PageWrapper>
    <TitleComponent text="Meus Pedidos" />
    <MeusPedidosContainer />
    <TitleComponent text="Atendimentos" />
    <AtendimentosClienteContainer />
  </PageWrapper>
);

export default ClientesPage;
