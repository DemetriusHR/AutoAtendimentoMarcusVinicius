import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: var(
    --background-body
  );
  flex-direction: column;

  i {
    text-align: center;
  }

  .logo {
    font-size: 80px;
  }

  .loading {
    font-size: 25px;
  }

  .icons {
    margin: auto;
    display: flex;
    flex-direction: column;
    color: var(
      --primary-color
    );
  }
`;

const LoadingComponent: React.FC = () => (
  <Wrapper>
    <div className="icons">
      <i className="logo">
        <svg
          id="Componente_7_1"
          data-name="Componente 7 – 1"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 512 513.173"
        >
          <rect
            id="Retângulo_9"
            data-name="Retângulo 9"
            width="512"
            height="512"
            fill="none"
          />
          <text
            id="LogoMenorPreto"
            transform="translate(41 371)"
            fill="#707070"
            fontSize="380"
            fontFamily="CinzelDecorative-Regular, Cinzel Decorative"
          >
            <tspan
              x="0"
              y="0"
            >
              M
            </tspan>
          </text>
          <text
            id="V"
            transform="matrix(1, -0.017, 0.017, 1, 80, 374.124)"
            fill="#ffc94a"
            fontSize="374"
            fontFamily="CinzelDecorative-Regular, Cinzel Decorative"
          >
            <tspan
              x="0"
              y="0"
            >
              V
            </tspan>
          </text>
        </svg>
      </i>
      <i className="loading">
        <LoadingOutlined translate="span" />
      </i>
    </div>
  </Wrapper>
);

export default LoadingComponent;
