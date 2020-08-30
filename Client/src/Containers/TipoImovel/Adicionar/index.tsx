import React from 'react';
import { Modal, Form, Tooltip, Input, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RequestApiCriarTipoImovel } from '../../../RequestApi/TipoImovel';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AdicionarTipoImovel: React.FC = () => {
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
      RequestApiCriarTipoImovel(values.nome, values.status, fechaModal);
    },
    [fechaModal]
  );

  return (
    <React.Fragment>
      <span onClick={abreModal}>
        <Tooltip title="Adicionar Tipo de Imóvel">
          <PlusOutlined />
        </Tooltip>
      </span>
      <Modal
        title="Adicionar Tipo de Imóvel"
        visible={visible}
        onCancel={fechaModal}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="adicionar-tipo-imovel"
          onFinish={onFinish}
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              { required: true, message: 'Insira o nome do tipo de imóvel!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              { required: true, message: 'Insira o status do tipo de imóvel!' },
            ]}
          >
            <Select>
              <Select.Option value={1}>Ativo</Select.Option>
              <Select.Option value={0}>Inativo</Select.Option>
            </Select>
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

export default AdicionarTipoImovel;
