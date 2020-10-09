import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #FFC94A;
    --info-color: #00bac4;
    --warning-color: #EFBD1A;
    --error-color: #F95555;
    --sucess-color: #48EBA4;
    --text-not-found-color: #9F9E9E;
    --text-size: 14px;
    --background-body: #484848;
    --header-color: #242424;
    --text-color: #707070;
    --card-color: #fff;
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
`;

export default GlobalStyle;
