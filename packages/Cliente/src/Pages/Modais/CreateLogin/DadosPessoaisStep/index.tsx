import React, { useCallback } from 'react';
import Form from 'antd/lib/form';
import Notification from 'antd/lib/notification';

import ButtonConfirm from '../../../../Components/ButtonConfirm';
import Input from '../../../../Components/Input';
import InputCPF from '../../../../Components/InputCPF';
import InputCelular from '../../../../Components/InputCelular';

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
        if (values.senha === values.confirmasenha) {
          console.log(values);
          setNextStep(1);
        } else {
          Notification.warning({
            message: 'Senha e Confirmação de Senha não iguais!',
          });
        }
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
            ]}
          >
            <Input />
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
            ]}
          >
            <Input />
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
