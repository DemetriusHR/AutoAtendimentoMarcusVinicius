import React, { useCallback, useState } from 'react';
import Alert from 'antd/lib/alert';
import Form from 'antd/lib/form';
import Notification from 'antd/lib/notification';
import styled from 'styled-components';

import ButtonConfirm from '../../../../Components/ButtonConfirm';
import Input from '../../../../Components/Input';
import shadeColor from '../../../../Utils/ShadeColor';
import EnderecoListComponent from './Components/EnderecoList';
import comparaEndereco from './Utils/comparaEndereco';
import { useModaisContext } from '../../../../Context/Modais';

const spanConfig = {
  span: 24,
};

interface IDadosResidenciaisStep {
  setNextStep: (step: number) => void;
}

const ButtonAdicionar = styled.button`
  color: var(--sucess-color);

  :active {
    color: ${(props) => shadeColor(props.theme.sucessColor, -20)};
  }
`;

export interface IEndereco {
  id: number;
  'rua_endereco_usuario': string;
  'no_endereco_usuario': number;
  'complemento_endereco_usuario': string;
  'cidade_endereco_usuario': string;
  'cep_endereco_usuario': string;
}

const CreateLoginDadosResidenciaisStep: React.FC<IDadosResidenciaisStep> = React.memo(
  ({ setNextStep }: IDadosResidenciaisStep) => {
    const [form] = Form.useForm();
    const {
      onModalCreateLoginUnVisible,
      onModalLoginVisible,
    } = useModaisContext();
    const [enderecos, setEnderecos] = useState<IEndereco[]>([]);

    const onFinish = useCallback((values) => {
      setEnderecos((prevState) => {
        const enderecoNovo = {
          id: Math.floor(Math.random() * 100),
          rua_endereco_usuario: values.endereco,
          no_endereco_usuario: values.numero,
          complemento_endereco_usuario: values.complemento,
          cidade_endereco_usuario: values.cidade,
          cep_endereco_usuario: values.cep,
        };

        if (comparaEndereco(prevState, enderecoNovo)) {
          return [...prevState, enderecoNovo];
        }

        return [...prevState];
      });
    }, []);

    const voltarStep = useCallback(() => {
      setNextStep(0);
    }, [setNextStep]);

    const removeEndereco = useCallback((endereco) => {
      setEnderecos((prevState) => {
        const stateModificado = [...prevState];
        const newState = stateModificado.filter(
          (enderecoState) => endereco.id !== enderecoState.id,
        );

        return [...newState];
      });
    }, []);

    const confirmar = useCallback(() => {
      if (enderecos.length) {
        onModalCreateLoginUnVisible();
        onModalLoginVisible();
        Notification.success({
          message: 'Perfil criado!',
          description: 'Faça o Login para continuar',
        });
      } else {
        Notification.error({
          message: 'Não é possível Confirmar o Cadastro!',
          description: 'Você deve cadastrar pelo menos um endereço',
        });
      }
    }, [enderecos, onModalCreateLoginUnVisible, onModalLoginVisible]);

    return (
      <div className="py-8">
        <Alert
          message="Precisamos de pelo menos um endereço seu. Mas, para seu conforto, você consegue cadastrar mais que um."
          type="info"
          showIcon
        />
        <div className="w-full h-6" />
        <Form
          labelCol={spanConfig}
          wrapperCol={spanConfig}
          name="dados-residencias-form"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Endereço"
            name="endereco"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira seu Endereço',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Número"
            name="numero"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira o Número do Endereço',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Complemento"
            name="complemento"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira o Complemento do Endereço',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="CEP"
            name="cep"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira o CEP do Endereço',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Cidade"
            name="cidade"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira o Cidade do Endereço',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-2" />
          <ButtonAdicionar type="submit">+ Adicionar Endereço</ButtonAdicionar>
        </Form>
        {enderecos.length >= 1 && (
          <div className="py-4">
            <p className="text-base">
              {enderecos.length > 1
                ? 'Endereços Cadastrados'
                : 'Endereço Cadastrado'}
            </p>
            {enderecos.map((endereco) => (
              <EnderecoListComponent
                key={endereco.rua_endereco_usuario}
                removeEndereco={removeEndereco}
                {...endereco}
              />
            ))}
            <div className="w-full h-2" />
          </div>
        )}
        <div className="w-full h-8" />
        <div className="flex flex-row-reverse">
          <ButtonConfirm className="w-1/3 ml-2" onClick={confirmar}>
            Confirmar Cadastrado
          </ButtonConfirm>
          <button type="button" onClick={voltarStep}>
            {'< Voltar '}
          </button>
        </div>
      </div>
    );
  },
);

export default CreateLoginDadosResidenciaisStep;
