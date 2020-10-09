import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.h3`
  width: max-content;
  color: var(
    --primary-color
  );
  border-color: var(
    --primary-color
  );
`;

const TitleComponent: React.FC<{
  text: string;
}> = ({
  text,
}) => (
  <div>
    <Wrapper className="pb-1 border-b text-xl">
      {
        text
      }
    </Wrapper>
  </div>
);

export default TitleComponent;
