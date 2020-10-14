import React from 'react';

import PageWrapper from '../../Components/PageWrapper';
import TitleComponent from '../../Components/Title';
import AtendimentosClienteContainer from '../../Containers/AtendimentosCliente';
import MeusPedidosContainer from '../../Containers/MeusPedidos';
import ModalLogin from '../Modais/Login';

const ClientesPage: React.FC = () => (
  <PageWrapper>
    <TitleComponent text="Meus Pedidos" />
    <MeusPedidosContainer />
    <TitleComponent text="Atendimentos" />
    <AtendimentosClienteContainer />
    <ModalLogin />
  </PageWrapper>
);

export default ClientesPage;
