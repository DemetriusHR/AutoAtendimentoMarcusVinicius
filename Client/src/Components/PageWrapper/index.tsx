import React from 'react';
import styled from 'styled-components';
import ConfigProvider from 'antd/lib/config-provider';
import ptBR from 'antd/lib/locale/pt_BR';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: #e1f1ff;
`;

const PageWrapper: React.FC = ({ children }) => (
  <ConfigProvider locale={ptBR}>
    <Wrapper>{children}</Wrapper>
  </ConfigProvider>
);

export default PageWrapper;
