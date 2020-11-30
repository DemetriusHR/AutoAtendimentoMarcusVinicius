import React, { useCallback, useState } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';

import ButtonPrimary from '../../../Components/ButtonPrimary';
import Input from '../../../Components/Input';
import Switch from '../../../Components/Switch';
import InputCPF from '../../../Components/InputCPF';
import InputCelular from '../../../Components/InputCelular';
import { useModaisContext } from '../../../Context/Modais';
import { LoginRequestAPI } from '../../../RequestAPI/Login';
import { useUsuarioContext } from '../../../Context/Usuario';

const spanConfig = {
  span: 24,
};

const textTitle: {
  cpf: string;
  celular: string;
} = {
  cpf: 'CPF',
  celular: 'Celular',
};

const erroInput: {
  cpf: string;
  celular: string;
} = {
  cpf: 'Insira seu CPF',
  celular: 'Insira seu Celular',
};

const InputLogin: {
  cpf: JSX.Element;
  celular: JSX.Element;
} = {
  cpf: <InputCPF />,
  celular: <InputCelular />,
};

const ModalLogin: React.FC = React.memo(() => {
  const { getDadosUsuario } = useUsuarioContext();
  const [form] = Form.useForm();
  const [nomeForm, setNomeForm] = useState<'cpf' | 'celular'>('celular');
  const [cpf, setCPF] = useState(false);
  const {
    modalLoginVisible,
    onModalLoginUnVisible,
    onModalCreateLoginVisible,
  } = useModaisContext();

  const getDados = useCallback(() => {
    onModalLoginUnVisible();
    getDadosUsuario();
  }, [onModalLoginUnVisible, getDadosUsuario]);

  const onSetCPF = useCallback(() => {
    setCPF((prevCpf) => {
      if (!prevCpf) {
        setNomeForm('cpf');
      } else {
        setNomeForm('celular');
      }

      return !prevCpf;
    });
  }, []);

  const onFinish = useCallback((values) => {
    if (cpf) {
      LoginRequestAPI(values.cpfTelefone.substring(0, 14), '', values.senha, getDados);
    } else {
      LoginRequestAPI('', values.cpfTelefone.substring(0, 14), values.senha, getDados);
    }
    form.resetFields();
  }, [cpf, form, getDados]);

  const onClickCadastre = useCallback(
    (e) => {
      e.preventDefault();
      onModalCreateLoginVisible();
    },
    [onModalCreateLoginVisible],
  );

  return (
    <Modal
      title="Faça seu Login"
      visible={modalLoginVisible}
      onCancel={onModalLoginUnVisible}
      footer={null}
      centered
      destroyOnClose
    >
      <div className="py-8">
        <Switch
          checkedChildren="CPF"
          unCheckedChildren="Celular"
          onChange={onSetCPF}
          checked={cpf}
        />
        <div className="w-full h-2" />
        <Form
          labelCol={spanConfig}
          wrapperCol={spanConfig}
          name="login-form"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label={textTitle[nomeForm]}
            name="cpfTelefone"
            required={false}
            rules={[
              {
                required: true,
                message: erroInput[nomeForm],
              },
            ]}
          >
            {InputLogin[nomeForm]}
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Senha"
            name="senha"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira sua Senha',
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="w-full my-8">
            Não tem Conta ainda?
            <a href="/" className="ml-2 underline" onClick={onClickCadastre}>
              Cadastre-se agora
            </a>
          </div>
          <div className="flex flex-row-reverse">
            <ButtonPrimary type="submit" className="w-1/3">
              Login
            </ButtonPrimary>
          </div>
        </Form>
      </div>
    </Modal>
  );
});

export default ModalLogin;
