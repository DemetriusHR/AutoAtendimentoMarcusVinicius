import styled from 'styled-components';
import shadeColor from '../../Utils/ShadeColor';

const ButtonConfirm = styled.button`
  color: #fff;
  background: var(--sucess-color);
  border-color: var(--sucess-color);
  padding: 0.25rem;

  :hover,
  :focus {
    color: #fff;
    background: ${(props) => shadeColor(props.theme.sucessColor, 15)};
    border-color: ${(props) => shadeColor(props.theme.sucessColor, 15)};
  }

  :active {
    color: #fff;
    background: ${(props) => shadeColor(props.theme.sucessColor, -20)};
    border-color: ${(props) => shadeColor(props.theme.sucessColor, -20)};
  }
`;

export default ButtonConfirm;
