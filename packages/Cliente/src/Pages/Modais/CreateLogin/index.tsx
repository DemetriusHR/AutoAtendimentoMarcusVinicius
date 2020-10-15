import React, {
  useCallback,
} from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';

import ButtonPrimary from '../../../Components/ButtonPrimary';
import Input from '../../../Components/Input';
import { useModaisContext } from '../../../Context/Modais';

const spanConfig = {
  span: 24,
};

const wrapperColConfig = {
  offset: 16,
  span: 8,
};

const ModalCreateLogin: React.FC = React.memo(
  () => {
    const {
      modalCreateLoginVisible,
      onModalLoginVisible,
    } = useModaisContext();

    const onFinish = useCallback(
      (
        values,
      ) => {
        console.log(
          values,
        );
      },
      [],
    );

    return (
      <Modal
        title="Cadastro"
        visible={
          modalCreateLoginVisible
        }
        onCancel={
          onModalLoginVisible
        }
        footer={
          null
        }
        centered
        destroyOnClose
      >
        <div className="py-8">
          <Form
            labelCol={
              spanConfig
            }
            wrapperCol={
              spanConfig
            }
            name="login-form"
            onFinish={
              onFinish
            }
          >
            <Form.Item
              label="CPF ou Telefone"
              name="cpf-telefone"
              required={
                false
              }
              rules={[
                {
                  required: true,
                  message:
                    'Insira seu CPF ou Telefone!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="w-full h-8" />
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
                    'Insira sua Senha!',
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <div className="w-full mb-8">
              Não tem Conta ainda?
              <a href="/" className="ml-2 underline">
                Cadastre-se agora
              </a>
            </div>
            <Form.Item
              wrapperCol={
                wrapperColConfig
              }
            >
              <ButtonPrimary type="submit">
                Login
              </ButtonPrimary>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  },
);

export default ModalCreateLogin;
