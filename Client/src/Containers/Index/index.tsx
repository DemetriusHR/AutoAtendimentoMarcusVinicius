import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

import ListagemImoveis from '../Imoveis/Listagem';
import ListagemTipoImovel from '../TipoImovel/Listagem';
import AdicionarImoveis from '../Imoveis/Adicionar';
import AdicionarTipoImovel from '../TipoImovel/Adicionar';

const IndexContainerWrapper = styled.div`
  padding: 30px;
`;

const IndexContainer: React.FC = () => (
  <IndexContainerWrapper>
    <Card title="Imóveis" extra={<AdicionarImoveis />}>
      <ListagemImoveis />
    </Card>
    <br />
    <Card title="Tipo de Imóveis" extra={<AdicionarTipoImovel />}>
      <ListagemTipoImovel />
    </Card>
  </IndexContainerWrapper>
);

export default IndexContainer;
