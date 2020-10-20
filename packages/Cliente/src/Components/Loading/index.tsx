import React from 'react';
import styled from 'styled-components';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

const Wrapper = styled.div`
  color: var(
    --primary-color
  );
  background: var(
    --background-body
  );
  flex-direction: column;

  i {
    text-align: center;
  }
`;

const LoadingComponent: React.FC = () => (
  <Wrapper className="min-h-screen flex flex-col">
    <div className="m-auto flex flex-col">
      <i className="text-6xl">
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
      <i className="text-lg">
        <LoadingOutlined translate="span" />
      </i>
    </div>
  </Wrapper>
);

export default LoadingComponent;
