import React from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

import Logo from '../../Images/logo.png';

const HeaderWrapper = styled.div`
  color: var(
    --primary-color
  );
  background: var(
    --header-color
  );
`;

const HeaderContainer: React.FC = () => (
  <HeaderWrapper className="flex w-full p-2 z-50 shadow">
    <div className="flex-1">
      <img
        src={
          Logo
        }
        alt="logo"
        className="h-8"
      />
    </div>
    <div className="flex-1 flex flex-row-reverse">
      <i className="inline-block align-middle">
        <UserOutlined translate="span" />
      </i>
      <div className="mr-2 inline-block align-middle">
        <span className="inline-block align-text-top">
          Log
          In
        </span>
      </div>
    </div>
  </HeaderWrapper>
);

export default HeaderContainer;
