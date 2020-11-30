import React from 'react';

import PageWrapper from '../../Components/PageWrapper';
import TitleComponent from '../../Components/Title';
import AtendimentosFuncionarioContainer from '../../Containers/AtendimentosFuncionario';
import PedidosPendentesContainer from '../../Containers/PedidosPendentes';
import PedidosPendentesProvider from '../../Context/PedidosPendentes';
import ModalCreateLogin from '../Modais/CreateLogin';
import ModalEditAccount from '../Modais/EditAccount';
import ModalLogin from '../Modais/Login';

const FuncionariosPage: React.FC = () => (
  <PedidosPendentesProvider>
    <PageWrapper>
      <TitleComponent text="Pedidos Pendentes" />
      <PedidosPendentesContainer />
      <TitleComponent text="Atendimentos" />
      <AtendimentosFuncionarioContainer />
      <ModalLogin />
      <ModalCreateLogin />
      <ModalEditAccount />
    </PageWrapper>
  </PedidosPendentesProvider>
);

export default FuncionariosPage;
