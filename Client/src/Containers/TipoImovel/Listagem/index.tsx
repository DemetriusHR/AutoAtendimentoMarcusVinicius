import React from 'react';
import { List, Tooltip, Space, Modal } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  RequestApiListagemTipoImovel,
  RequestApiDeletarTipoImovel,
} from '../../../RequestApi/TipoImovel';
import EditarTipoImovel from '../Editar';
import ITipoImoveis from '../../../Intefaces/ITipoImoveis';

function showConfirm(id: number, atualiza: () => void) {
  Modal.confirm({
    title: 'Você quer realmente remover esse item?',
    icon: <ExclamationCircleOutlined />,
    content: 'Irá perder esse item permanentemente',
    onOk() {
      RequestApiDeletarTipoImovel(id, atualiza);
    },
  });
}

const statusTipoImovel = ['Inativo', 'Ativo'];

const ListagemTipoImoveis: React.FC = () => {
  const [tiposImoveis, setTipoImoveis] = React.useState<ITipoImoveis[]>([]);

  const listaTipoImoveis = React.useCallback(() => {
    const tipoImoveisListados: ITipoImoveis[] = RequestApiListagemTipoImovel();
    setTipoImoveis(tipoImoveisListados);
  }, []);

  React.useEffect(() => {
    listaTipoImoveis();
  }, [listaTipoImoveis]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
      }}
      dataSource={tiposImoveis}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <Space>
              <EditarTipoImovel
                id={item.id}
                nome={item.nome}
                status={item.status}
              />
            </Space>,
            <Space>
              <span onClick={() => showConfirm(item.id, listaTipoImoveis)}>
                <Tooltip title="Excluir Tipo de Imóvel">
                  <DeleteOutlined />
                </Tooltip>
              </span>
            </Space>,
          ]}
        >
          <List.Item.Meta
            title={item.nome}
            description={statusTipoImovel[item.status]}
          />
        </List.Item>
      )}
    />
  );
};

export default ListagemTipoImoveis;
