import React from 'react';
import { List, Tooltip, Space, Modal } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import EditarImovel from '../Editar';
import {
  RequestApiListagemImovel,
  RequestApiDeletarImovel,
} from '../../../RequestApi/Imovel';
import IImoveis from '../../../Intefaces/IImoveis';

function showConfirm(id: number, atualiza: () => void) {
  Modal.confirm({
    title: 'Você quer realmente remover esse item?',
    icon: <ExclamationCircleOutlined />,
    content: 'Irá perder esse item permanentemente',
    onOk() {
      RequestApiDeletarImovel(id, atualiza);
    },
  });
}

const ListagemImoveis: React.FC = () => {
  const [imoveis, setImoveis] = React.useState<IImoveis[]>([]);

  const listaImoveis = React.useCallback(() => {
    const imoveisListados: IImoveis[] = RequestApiListagemImovel();
    setImoveis(imoveisListados);
  }, []);

  React.useEffect(() => {
    listaImoveis();
  }, [listaImoveis]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
      }}
      dataSource={imoveis}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <Space>
              <EditarImovel
                id={item.id}
                endereco={item.endereco}
                numero={item.numero}
                cidade={item.cidade}
                estado={item.estado}
                quartos={item.quartos}
                banheiros={item.banheiros}
                detahes={item.detahes}
                tipoImovel={item.tipoImovel}
              />
            </Space>,
            <Space>
              <span onClick={() => showConfirm(item.id, listaImoveis)}>
                <Tooltip title="Excluir Imóvel">
                  <DeleteOutlined />
                </Tooltip>
              </span>
            </Space>,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://loja.rodobens.com.br/consorcio/PublishingImages/2020/Produtos/Im%C3%B3veis/12_grande.jpg"
            />
          }
        >
          <List.Item.Meta
            title={`${item.endereco} N° ${item.numero}`}
            description={`Cidade: ${item.cidade} - ${item.estado} / Tipo de Imóvel: ${item.nome}`}
          />
          <p>{`Quantidade de Quartos: ${item.quartos} / Quantidade de Banheiros: ${item.banheiros}`}</p>
          <p>{item.detahes}</p>
        </List.Item>
      )}
    />
  );
};

export default ListagemImoveis;
