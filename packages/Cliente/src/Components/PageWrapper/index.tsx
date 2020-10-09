import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../Containers/Header';

const Wrapper = styled.div`
  background: var(
    --background-body
  );
`;

const PageWrapper: React.FC = ({
  children,
}) => (
  <Wrapper className="flex flex-col min-h-screen w-full">
    <HeaderContainer />
    <div className="p-12">
      {
        children
      }
    </div>
  </Wrapper>
);

export default PageWrapper;
