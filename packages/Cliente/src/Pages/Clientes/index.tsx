import React from 'react';

import PageWrapper from '../../Components/PageWrapper';
import TitleComponent from '../../Components/Title';
import AtendimentosClienteContainer from '../../Containers/AtendimentosCliente';
import MeusPedidosContainer from '../../Containers/MeusPedidos';
import ModalCreateLogin from '../Modais/CreateLogin';
import ModalEditAccount from '../Modais/EditAccount';
import ModalLogin from '../Modais/Login';

const ClientesPage: React.FC = () => (
  <PageWrapper>
    <TitleComponent text="Meus Pedidos" />
    <MeusPedidosContainer />
    <TitleComponent text="Atendimentos" />
    <AtendimentosClienteContainer />
    <ModalLogin />
    <ModalCreateLogin />
    <ModalEditAccount />
  </PageWrapper>
);

export default ClientesPage;
