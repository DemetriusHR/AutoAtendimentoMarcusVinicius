import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Login from './Pages/Login';
import CriarLogin from './Pages/CriarLogin';
import Index from './Pages/Index';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Login} />
      <Route path="/criar-login" exact={true} component={CriarLogin} />
      <Route path="/index" exact={true} component={Index} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
