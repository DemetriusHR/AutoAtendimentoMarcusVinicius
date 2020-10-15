import React from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

import Logo from '../../Images/logo.png';
import { useModaisContext } from '../../Context/Modais';

const HeaderWrapper = styled.div`
  color: var(
    --primary-color
  );
  background: var(
    --header-color
  );
`;

const HeaderContainer: React.FC = React.memo(() => {
  const { onModalLoginVisible } = useModaisContext();

  return (
    <HeaderWrapper className="flex w-full p-2 z-50 shadow items-center">
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
        <button
          className="flex items-center cursor-pointer"
          onClick={onModalLoginVisible}
          type="button"
        >
          <div className="mr-2 inline-block">
            <span className="inline-block align-text-top">
              Log
              In
            </span>
          </div>
          <i className="flex items-center text-lg">
            <UserOutlined
              className="align-text-top"
              translate="span"
            />
          </i>
        </button>
      </div>
    </HeaderWrapper>
  );
});

export default HeaderContainer;
