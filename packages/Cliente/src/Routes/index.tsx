import React, { lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ConfigProvider from 'antd/lib/config-provider';
import ptBR from 'antd/lib/locale/pt_BR';

import LazyLoading from '../Components/LazyLoading';
import LoadingComponent from '../Components/Loading';
import NotFoundComponent from '../Components/NotFound';

const IndexPage = lazy(() => import('../Pages/Index'));

const Routes: React.FC = () => (
  <ConfigProvider locale={ptBR}>
    <BrowserRouter>
      <Switch>
        <Route component={LazyLoading(IndexPage)} path="/" exact />
        <Route component={LoadingComponent} path="/loading" exact />
        <Route component={NotFoundComponent} />
      </Switch>
    </BrowserRouter>
  </ConfigProvider>
);

export default Routes;
