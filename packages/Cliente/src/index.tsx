import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import 'antd/dist/antd.css';
import 'moment/locale/pt-br';
import './Components/GlobalStyle/index.css';

import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import GlobalStyle from './Components/GlobalStyle';
import Theme from './Utils/Theme';

moment.locale('pt-br');

ReactDOM.render(
  <Theme>
    <Routes />
    <GlobalStyle />
  </Theme>,
  document.getElementById('root'),
);

serviceWorker.unregister();
