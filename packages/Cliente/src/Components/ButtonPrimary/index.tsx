import styled from 'styled-components';
import shadeColor from '../../Utils/ShadeColor';

const ButtonPrimary = styled.button`
  color: #fff;
  background: var(--primary-color);
  border-color: var(--primary-color);
  padding: 0.5rem 1.5rem;

  :hover,
  :focus {
    color: #fff;
    background: ${(props) => shadeColor(props.theme.primaryColor, 15)};
    border-color: ${(props) => shadeColor(props.theme.primaryColor, 15)};
  }

  :active {
    color: #fff;
    background: ${(props) => shadeColor(props.theme.primaryColor, -20)};
    border-color: ${(props) => shadeColor(props.theme.primaryColor, -20)};
  }
`;

export default ButtonPrimary;
