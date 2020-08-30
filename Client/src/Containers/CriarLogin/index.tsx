import React from 'react';
import { Form, Input, Button, Card, Select } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { RequestApiCriarLogin } from '../../RequestApi/Login';

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
      if (values.senha === values.confirmar_senha) {
        RequestApiCriarLogin(
          values.nome,
          values.login,
          values.senha,
          values.situacao,
          alterRoute
        );
      }
    },
    [alterRoute]
  );

  return (
    <LoginContainerWrapper>
      <Card>
        <h1>Criar Login</h1>
        <Form {...layout} name="form_cria_login" onFinish={onFinish}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: 'Insira seu nome!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Insira seu login!' }]}
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

          <Form.Item
            label="Confirmar Senha"
            name="confirmar_senha"
            rules={[
              { required: true, message: 'Confirme sua senha!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('senha') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'A senha e a confirmação não são iguais!'
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Status da Conta" name="status">
            <Select>
              <Select.Option value={1}>Ativo</Select.Option>
              <Select.Option value={0}>Inativo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Criar Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LoginContainerWrapper>
  );
};

export default LoginContainer;
