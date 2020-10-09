import React from 'react';
import {
  Modal,
  Form,
  Tooltip,
  Input,
  Button,
  InputNumber,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RequestApiCriarImovel } from '../../../RequestApi/Imovel';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AdicionarImoveis: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [form] = Form.useForm();

  const abreModal = React.useCallback(() => {
    setVisible(true);
  }, []);

  const fechaModal = React.useCallback(() => {
    setVisible(false);
  }, []);

  const limpaForm = React.useCallback(() => {
    form.resetFields();
  }, [form]);

  const onFinish = React.useCallback(
    values => {
      RequestApiCriarImovel(
        values.endereco,
        values.numero,
        values.cidade,
        values.estado,
        values.quartos,
        values.banheiros,
        values.detahes,
        values.tipoImovel,
        fechaModal
      );
    },
    [fechaModal]
  );

  return (
    <React.Fragment>
      <span onClick={abreModal}>
        <Tooltip title="Adicionar Imóvel">
          <PlusOutlined />
        </Tooltip>
      </span>
      <Modal
        title="Adicionar Imóvel"
        visible={visible}
        onCancel={fechaModal}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="adicionar-imovel"
          onFinish={onFinish}
        >
          <Form.Item
            name="endereco"
            label="Endereço"
            rules={[
              { required: true, message: 'Insira o endereço do imóvel!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="numero" label="Número" rules={[{ type: 'number' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="cidade"
            label="Cidade"
            rules={[{ required: true, message: 'Insira a cidade do imóvel!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quartos"
            label="Número de Quartos"
            rules={[{ type: 'number' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="banheiros"
            label="Número de Banheiros"
            rules={[{ type: 'number' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="detalhes" label="Detalhes">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button htmlType="button" onClick={limpaForm}>
              Limpar Formulário
            </Button>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AdicionarImoveis;
