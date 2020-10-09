import React from 'react';
import { Modal, Form, Tooltip, Input, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RequestApiEditarTipoImovel } from '../../../RequestApi/TipoImovel';
import ITipoImoveis from '../../../Intefaces/ITipoImoveis';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const EditarTipoImovel: React.FC<ITipoImoveis> = ({
  id,
  nome,
  status,
}: ITipoImoveis) => {
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
      RequestApiEditarTipoImovel(values.nome, values.status, id, fechaModal);
    },
    [fechaModal, id]
  );

  return (
    <React.Fragment>
      <span onClick={abreModal}>
        <Tooltip title="Editar Tipo de Imóvel">
          <PlusOutlined />
        </Tooltip>
      </span>
      <Modal
        title="Editar Tipo de Imóvel"
        visible={visible}
        onCancel={fechaModal}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="editar-tipo-imovel"
          onFinish={onFinish}
          initialValues={{ nome, status }}
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

export default EditarTipoImovel;
