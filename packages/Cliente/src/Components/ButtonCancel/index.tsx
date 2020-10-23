import styled from 'styled-components';
import shadeColor from '../../Utils/ShadeColor';

const ButtonCancel = styled.button`
  color: var(--error-color);
  background: transparent;
  border-color: var(--error-color);
  padding: 0.25rem;

  :hover,
  :focus {
    color: #fff;
    background: ${(props) => shadeColor(props.theme.errorColor, 15)};
    border-color: ${(props) => shadeColor(props.theme.errorColor, 15)};
  }

  :active {
    color: #fff;
    background: var(--error-color);
    border-color: var(--error-color);
  }
`;

export default ButtonCancel;
