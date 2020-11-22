import React, { useCallback } from 'react';
import Form from 'antd/lib/form';

import Input from '../../../../Components/Input';
import { CadastrarEnderecoRequestAPI } from '../../../../RequestAPI/Login';
import InputCEP from '../../../../Components/InputCEP';
import { useUsuarioContext } from '../../../../Context/Usuario';
import ButtonConfirm from '../../../../Components/ButtonConfirm';

const spanConfig = {
  span: 24,
};

interface IDadosResidenciaisAdicionar {
  close: () => void;
}

const DadosResidenciaisAdicionar: React.FC<IDadosResidenciaisAdicionar> = React.memo(
  ({ close }: IDadosResidenciaisAdicionar) => {
    const {
      usuario: { id },
      resetDadosUsuario,
    } = useUsuarioContext();

    const onFinish = useCallback(
      (values) => {
        CadastrarEnderecoRequestAPI(
          id,
          values.endereco,
          values.numero,
          values.cidade,
          values.cep,
          values.complemento,
          resetDadosUsuario,
          close,
        );
      },
      [close, id, resetDadosUsuario],
    );

    return (
      <div className="py-8">
        <div className="w-full h-6" />
        <Form
          labelCol={spanConfig}
          wrapperCol={spanConfig}
          name="dados-residencias-form"
          onFinish={onFinish}
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
          <Form.Item label="Complemento" name="complemento" required={false}>
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
              () => ({
                validator(rule, value) {
                  if (value.length === 9) {
                    return Promise.resolve();
                  }
                  // eslint-disable-next-line
                  return Promise.reject('Insira um CEP correto');
                },
              }),
            ]}
          >
            <InputCEP />
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
          <div className="flex flex-row-reverse">
            <ButtonConfirm type="submit" className="w-1/3">
              Confirmar
            </ButtonConfirm>
          </div>
        </Form>
      </div>
    );
  },
);

export default DadosResidenciaisAdicionar;
