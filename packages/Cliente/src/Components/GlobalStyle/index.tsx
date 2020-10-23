import { createGlobalStyle } from 'styled-components';
import shadeColor from '../../Utils/ShadeColor';

interface IProps {
  theme: {
    primaryColor: string;
    infoColor: string;
    warningColor: string;
    errorColor: string;
    sucessColor: string;
    textNotFoundColor: string;
    textSize: string;
    backgroundBody: string;
    headerColor: string;
    textColor: string;
    cardColor: string;
  }
}

const GlobalStyle = createGlobalStyle`
  @tailwind base;

  @tailwind components;

  @tailwind utilities;

  :root {
    --primary-color: ${(props: IProps) => props.theme.primaryColor};
    --info-color: ${(props: IProps) => props.theme.infoColor};
    --warning-color: ${(props: IProps) => props.theme.warningColor};
    --error-color: ${(props: IProps) => props.theme.errorColor};
    --sucess-color:${(props: IProps) => props.theme.sucessColor};
    --text-not-found-color: ${(props: IProps) => props.theme.textNotFoundColor};
    --text-size: ${(props: IProps) => props.theme.textSize};
    --background-body: ${(props: IProps) => props.theme.backgroundBody};
    --header-color: ${(props: IProps) => props.theme.headerColor};
    --text-color: ${(props: IProps) => props.theme.textColor};
    --card-color: ${(props: IProps) => props.theme.cardColor};
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Antic Slab', serif;
    background: var(---background-body);
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    min-height: 100vh;
    color: var(--text-color);
  }

  a {
    color: var(--primary-color);

    :hover,
    :focus {
      color: ${(props) => shadeColor(props.theme.primaryColor, 15)};
    }

    :active {
      color: ${(props) => shadeColor(props.theme.primaryColor, -20)};
    }
  }
  
  .ant-modal-header {
    border-bottom: 1px solid transparent;
  }

  .ant-form-item-label > label {
    color: var(--text-color);
  }

  .ant-modal-title {
    color: var(--text-color);
  }

  .ant-form-item-has-error .ant-input:focus, .ant-form-item-has-error .ant-input-affix-wrapper:focus, .ant-form-item-has-error .ant-input-focused, .ant-form-item-has-error .ant-input-affix-wrapper-focused {
    box-shadow: 0 0 0 0 transparent;

    & ~ .border-effect {
      width: 100%;
      background: var(--error-color);
    }
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${(props) => shadeColor(props.theme.primaryColor, -20)};
  }

  .ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
    color: var(--primary-color);
  }

  .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
    background: var(--primary-color);
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--text-color);
  }

  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border: 0;
    border-bottom: 1px solid var(--primary-color);
  }
  
  .ant-select-focused.ant-select-single:not(.ant-select-costumize-input) .ant-select-selector {
    border: 0;
    border-bottom: 1px solid var(--primary-color);
    box-shadow: 0 0 0 2px ${(props) => shadeColor(props.theme.primaryColor, 50)};
  }

  .ant-btn:hover,
  .ant-btn:focus {
    color: ${(props) => shadeColor(props.theme.primaryColor, 15)};
    border-color: ${(props) => shadeColor(props.theme.primaryColor, 15)};
  }

  .ant-btn:active {
    color: ${(props) => shadeColor(props.theme.primaryColor, -20)};
    border-color: ${(props) => shadeColor(props.theme.primaryColor, -20)};
  }

  .ant-btn-primary {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff;
  }

  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    color: #fff;
    border-color: ${(props) => shadeColor(props.theme.primaryColor, 15)};
    background: ${(props) => shadeColor(props.theme.primaryColor, 15)};
  }

  .ant-btn-primary:active  {
    color: #fff;
    background: ${(props) => shadeColor(props.theme.primaryColor, -20)};
  }

  .pedido-collapse .pedido-collapse-panel,
  .pedido-collapse .pedido-collapse-panel {
    border-radius: 2px;
    margin-bottom: 1em;
    border: 0px;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
`;

export default GlobalStyle;
