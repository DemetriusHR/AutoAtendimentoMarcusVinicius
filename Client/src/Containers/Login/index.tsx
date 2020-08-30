import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';

import { RequestApiLogin } from '../../RequestApi/Login';
import { RequestApiListagemTipoImovel } from '../../RequestApi/TipoImovel';

const LoginContainerWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: auto;
`;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginContainer: React.FC = () => {
  const history = useHistory();

  const alterRoute = React.useCallback(() => {
    history.push('/index');
  }, [history]);

  const onFinish = React.useCallback(
    values => {
      RequestApiLogin(values.login, values.senha, alterRoute);
    },
    [alterRoute]
  );

  return (
    <LoginContainerWrapper>
      <Card>
        <Form {...layout} name="form_login" onFinish={onFinish}>
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Insira seu Login!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: 'Insira sua senha!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Entrar
            </Button>
          </Form.Item>
          {console.log(RequestApiListagemTipoImovel())}
          <p>
            Não tem conta? <Link to="/criar-login">Crie aqui</Link>
          </p>
        </Form>
      </Card>
    </LoginContainerWrapper>
  );
};

export default LoginContainer;
