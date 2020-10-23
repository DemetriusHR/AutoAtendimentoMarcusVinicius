import React from 'react';
import styled from 'styled-components';

import Logo from '../../Images/logo.png';
import ButtonUsuarioHeader from './ButtonUsuario';

const HeaderWrapper = styled.div`
  color: var(--primary-color);
  background: var(--header-color);
`;

const HeaderContainer: React.FC = React.memo(() => (
  <HeaderWrapper className="flex w-full p-2 z-50 shadow items-center">
    <div className="flex-1">
      <img src={Logo} alt="logo" className="h-8" />
    </div>
    <div className="flex-1 flex flex-row-reverse">
      <ButtonUsuarioHeader />
    </div>
  </HeaderWrapper>
));

export default HeaderContainer;
