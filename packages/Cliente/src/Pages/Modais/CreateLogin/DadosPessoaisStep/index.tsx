import React, {
  useCallback,
} from 'react';
import Form from 'antd/lib/form';

import ButtonConfirm from '../../../../Components/ButtonConfirm';
import Input from '../../../../Components/Input';

const spanConfig = {
  span: 24,
};

interface ICreateLoginDadosPessoaisStep {
  setNextStep: (step: number) => void;
}

const CreateLoginDadosPessoaisStep: React.FC<ICreateLoginDadosPessoaisStep> = React.memo(
  ({ setNextStep }: ICreateLoginDadosPessoaisStep) => {
    const onFinish = useCallback(
      (
        values,
      ) => {
        console.log(
          values,
        );
        setNextStep(1);
      },
      [setNextStep],
    );

    return (
      <div className="py-8">
        <Form
          labelCol={
            spanConfig
          }
          wrapperCol={
            spanConfig
          }
          name="dados-pessoais-form"
          onFinish={
            onFinish
          }
        >
          <Form.Item
            label="Nome Completo"
            name="nome"
            required={
              false
            }
            rules={[
              {
                required: true,
                message:
                  'Insira seu Nome Completo',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="CPF"
            name="cpf"
            required={
              false
            }
            rules={[
              {
                required: true,
                message:
                  'Insira seu CPF',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Celular"
            name="telefone"
            required={
              false
            }
            rules={[
              {
                required: true,
                message:
                  'Insira seu Celular',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Senha"
            name="senha"
            required={
              false
            }
            rules={[
              {
                required: true,
                message:
                  'Insira seu Senha',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Confirmar Senha"
            name="confirmar-senha"
            required={
              false
            }
            rules={[
              {
                required: true,
                message:
                  'Insira seu Confirmar Senha',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-8" />
          <div className="flex flex-row-reverse">
            <ButtonConfirm
              type="submit"
              className="w-1/3"
            >
              {
                'Próximo >'
              }
            </ButtonConfirm>
          </div>
        </Form>
      </div>
    );
  },
);

export default CreateLoginDadosPessoaisStep;
