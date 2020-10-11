import AntCard from 'antd/lib/card';
import styled from 'styled-components';

const Card = styled(
  AntCard,
)`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;

  .pedido-collapse,
  .pedido-collapse-panel {
    margin-bottom: 2rem;
  }

  .ant-card-body {
    padding: 0.5rem;
  }
`;

export default Card;
