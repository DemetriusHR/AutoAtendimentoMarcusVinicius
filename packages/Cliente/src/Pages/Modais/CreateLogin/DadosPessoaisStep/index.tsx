import React, { useCallback } from 'react';
import Form from 'antd/lib/form';

import ButtonConfirm from '../../../../Components/ButtonConfirm';
import Input from '../../../../Components/Input';
import InputCPF from '../../../../Components/InputCPF';
import InputCelular from '../../../../Components/InputCelular';
import VerificaCPF from '../../../../Utils/VerificaCPF';

const spanConfig = {
  span: 24,
};

interface ICreateLoginDadosPessoaisStep {
  setNextStep: (step: number) => void;
}

const CreateLoginDadosPessoaisStep: React.FC<ICreateLoginDadosPessoaisStep> = React.memo(
  ({ setNextStep }: ICreateLoginDadosPessoaisStep) => {
    const onFinish = useCallback(
      (values) => {
        const form = JSON.stringify(values);
        sessionStorage.setItem('form', form);

        setNextStep(1);
      },
      [setNextStep],
    );

    return (
      <div className="py-8">
        <Form
          labelCol={spanConfig}
          wrapperCol={spanConfig}
          name="dados-pessoais-form"
          onFinish={onFinish}
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
                  return Promise.reject('Insira um senha com no mínimo 8 dígitos');
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
                  return Promise.reject('Senha e Confirmação de Senha não são iguais!');
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="w-full h-8" />
          <div className="flex flex-row-reverse">
            <ButtonConfirm type="submit" className="w-1/3">
              {'Próximo >'}
            </ButtonConfirm>
          </div>
        </Form>
      </div>
    );
  },
);

export default CreateLoginDadosPessoaisStep;
