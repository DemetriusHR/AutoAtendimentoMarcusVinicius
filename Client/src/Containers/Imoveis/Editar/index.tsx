import React from 'react';
import { Modal, Form, Tooltip, Input, Button, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RequestApiEditarImovel } from '../../../RequestApi/Imovel';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface IImoveis {
  endereco: string;
  numero: number;
  cidade: string;
  estado: string;
  quartos: number;
  banheiros: number;
  detahes: string;
  tipoImovel: number;
  id: number;
}

const EditarImovel: React.FC<IImoveis> = ({
  id,
  endereco,
  numero,
  cidade,
  estado,
  quartos,
  banheiros,
  detahes,
  tipoImovel,
}: IImoveis) => {
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
      RequestApiEditarImovel(
        values.endereco,
        values.numero,
        values.cidade,
        values.estado,
        values.quartos,
        values.banheiros,
        values.detahes,
        values.tipoImovel,
        id,
        fechaModal
      );
    },
    [fechaModal, id]
  );

  return (
    <React.Fragment>
      <span onClick={abreModal}>
        <Tooltip title="Editar Imóvel">
          <PlusOutlined />
        </Tooltip>
      </span>
      <Modal
        title="Editar Imóvel"
        visible={visible}
        onCancel={fechaModal}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="editar-imovel"
          onFinish={onFinish}
          initialValues={{
            endereco,
            numero,
            cidade,
            estado,
            quartos,
            banheiros,
            detahes,
            tipoImovel,
          }}
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

export default EditarImovel;
