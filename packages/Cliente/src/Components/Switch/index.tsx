import AntSwitch from 'antd/lib/switch';
import styled from 'styled-components';
import shadeColor from '../../Utils/ShadeColor';

const Switch = styled(AntSwitch)`
  &.ant-switch-checked {
    color: var(--primary-color);
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &.ant-switch:focus {
    box-shadow: 0 0 0 2px ${(props) => shadeColor(props.theme.primaryColor, 50)};
  }
`;

export default Switch;
