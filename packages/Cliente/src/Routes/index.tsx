import React, {
  lazy,
} from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import ConfigProvider from 'antd/lib/config-provider';
import ptBR from 'antd/lib/locale/pt_BR';

import LazyLoading from '../Components/LazyLoading';
import LoadingComponent from '../Components/Loading';

const ClientesPage = lazy(
  () => import(
    '../Pages/Clientes'
  ),
);

const Routes: React.FC = () => (
  <ConfigProvider
    locale={
      ptBR
    }
  >
    <BrowserRouter>
      <Route
        component={LazyLoading(
          ClientesPage,
        )}
        path="/"
        exact
      />
      <Route
        component={
          LoadingComponent
        }
        path="/loading"
        exact
      />
    </BrowserRouter>
  </ConfigProvider>
);

export default Routes;
