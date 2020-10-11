import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'antd/dist/antd.css';
import 'moment/locale/pt-br';

import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import GlobalStyle from './Components/GlobalStyle';

moment.locale(
  'pt-br',
);

ReactDOM.render(
  <React.StrictMode>
    <Routes />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById(
    'root',
  ),
);

serviceWorker.unregister();
