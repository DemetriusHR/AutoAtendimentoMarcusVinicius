import React, { useCallback, useMemo } from 'react';
import Form from 'antd/lib/form';

import ButtonConfirm from '../../../../Components/ButtonConfirm';
import Input from '../../../../Components/Input';
import InputCPF from '../../../../Components/InputCPF';
import InputCelular from '../../../../Components/InputCelular';
import VerificaCPF from '../../../../Utils/VerificaCPF';
import { useModaisContext } from '../../../../Context/Modais';
import { useUsuarioContext } from '../../../../Context/Usuario';
import { EditarUsuarioRequestAPI } from '../../../../RequestAPI/Usuario';

const spanConfig = {
  span: 24,
};

const EditAccountDadosPessoais: React.FC = React.memo(() => {
  const {
    usuario: {
      id,
      nome,
      cpf,
      celular,
      senha,
    },
    getDadosUsuario,
    resetDadosUsuario,
  } = useUsuarioContext();
  const { onModalEditAccountUnVisible } = useModaisContext();

  const onFinishEditar = useCallback(() => {
    getDadosUsuario();
    onModalEditAccountUnVisible();
  }, [getDadosUsuario, onModalEditAccountUnVisible]);

  const onFinish = useCallback(
    (values) => {
      EditarUsuarioRequestAPI(
        id,
        values.nome,
        values.cpf,
        values.telefone,
        values.senha,
        resetDadosUsuario,
        onFinishEditar,
      );
    },
    [onFinishEditar, resetDadosUsuario, id],
  );

  const telefone = useMemo(() => {
    if (celular.length > 14) {
      return celular.substring(0, 14);
    }

    return celular;
  }, [celular]);

  return (
    <div className="py-8">
      <Form
        labelCol={spanConfig}
        wrapperCol={spanConfig}
        name="dados-pessoais-form"
        onFinish={onFinish}
        initialValues={{
          nome,
          cpf,
          telefone,
          senha,
          confirmarsenha: senha,
        }}
      >
        <Form.Item
          label="Nome Completo"
          name="nome"
          required={false}
          rules={[
            {
              required: true,
              message: 'Insira seu Nome Completo',
            },
            () => ({
              validator(rule, value) {
                if (value.length > 5) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line
                return Promise.reject('Digite seu nome completo!');
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <div className="w-full h-4" />
        <Form.Item
          label="CPF"
          name="cpf"
          required={false}
          rules={[
            {
              required: true,
              message: 'Insira seu CPF',
            },
            () => ({
              validator(rule, value) {
                if (VerificaCPF(value)) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line
                return Promise.reject('Insira um CPF correto');
              },
            }),
          ]}
        >
          <InputCPF />
        </Form.Item>
        <div className="w-full h-4" />
        <Form.Item
          label="Celular"
          name="telefone"
          required={false}
          rules={[
            {
              required: true,
              message: 'Insira seu Celular',
            },
            () => ({
              validator(rule, value) {
                if (value.length === 14) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line
                return Promise.reject('Insira um Celular correto');
              },
            }),
          ]}
        >
          <InputCelular />
        </Form.Item>
        <div className="w-full h-4" />
        <Form.Item
          label="Senha"
          name="senha"
          required={false}
          rules={[
            {
              required: true,
              message: 'Insira seu Senha',
            },
            () => ({
              validator(rule, value) {
                if (value.length > 8) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line
                return Promise.reject(
                  'Insira um senha com no mínimo 8 dígitos',
                );
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <div className="w-full h-4" />
        <Form.Item
          label="Confirmar Senha"
          name="confirmarsenha"
          required={false}
          rules={[
            {
              required: true,
              message: 'Insira seu Confirmar Senha',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (getFieldValue('senha') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line
                return Promise.reject(
                  'Senha e Confirmação de Senha não são iguais!',
                );
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <div className="w-full h-8" />
        <div className="flex flex-row-reverse">
          <ButtonConfirm type="submit" className="w-1/3">
            {'Confirmar Edição '}
          </ButtonConfirm>
        </div>
      </Form>
    </div>
  );
});

export default EditAccountDadosPessoais;
