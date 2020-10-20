import React, { useCallback } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';

import ButtonPrimary from '../../../Components/ButtonPrimary';
import Input from '../../../Components/Input';
import { useModaisContext } from '../../../Context/Modais';

const spanConfig = {
  span: 24,
};

const ModalLogin: React.FC = React.memo(() => {
  const {
    modalLoginVisible,
    onModalLoginUnVisible,
    onModalCreateLoginVisible,
  } = useModaisContext();

  const onFinish = useCallback((values) => {
    console.log(values);
  }, []);

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
        <Form
          labelCol={spanConfig}
          wrapperCol={spanConfig}
          name="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            label="CPF ou Celular"
            name="cpf-telefone"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira seu CPF ou Telefone!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Senha"
            name="senha"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira sua Senha!',
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
