import React from 'react';

import PageWrapper from '../../Components/PageWrapper';
import TitleComponent from '../../Components/Title';
import AtendimentosFuncionarioContainer from '../../Containers/AtendimentosFuncionario';
import PedidosPendentesContainer from '../../Containers/PedidosPendentes';
import ModalCreateLogin from '../Modais/CreateLogin';
import ModalLogin from '../Modais/Login';

const FuncionariosPage: React.FC = () => (
  <PageWrapper>
    <TitleComponent text="Pedidos Pendentes" />
    <PedidosPendentesContainer />
    <TitleComponent text="Atendimentos" />
    <AtendimentosFuncionarioContainer />
    <ModalLogin />
    <ModalCreateLogin />
  </PageWrapper>
);

export default FuncionariosPage;
