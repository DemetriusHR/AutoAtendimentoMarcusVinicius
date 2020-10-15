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
`;

export default GlobalStyle;
