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
}: {
  children?: React.ReactNode;
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

PageWrapper.defaultProps = {
  children: (
    <div />
  ),
};

export default PageWrapper;
