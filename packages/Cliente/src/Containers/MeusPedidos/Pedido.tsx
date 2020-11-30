import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import moment from 'moment';
import styled from 'styled-components';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import Modal from 'antd/lib/modal';
import Tooltip from 'antd/lib/tooltip';

import MeusPedidosReport from './Report';
import IPedido from '../../Interfaces/IPedido';
import useProdutosPedidoCliente from '../../Hooks/useProdutosPedidoCliente';
import { useUsuarioContext } from '../../Context/Usuario';

const TextStatus = styled.span`
  color: var(--error-color);
`;

interface IMeusPedidosPedido {
  pedido: IPedido;
}

function removerPedido(): void {
  Modal.confirm({
    title: 'Deseja excluir seu pedido mesmo?',
    icon: <CloseCircleOutlined translate="span" className="error-color" />,
    okText: 'Sim',
    cancelText: 'Não',
    okType: 'danger',
    cancelButtonProps: {
      className: 'button-not-sucess',
    },
  });
}

const MeusPedidosPedido: React.FC<IMeusPedidosPedido> = ({
  pedido: { idatendimento, dtpedido, entregue },
}: IMeusPedidosPedido) => {
  const [modal, setModal] = useState(false);
  const { resetDadosUsuario } = useUsuarioContext();
  const { state, getPedidoProdutos } = useProdutosPedidoCliente();

  const getProdutos = useCallback(() => {
    getPedidoProdutos(idatendimento, resetDadosUsuario);
  }, [idatendimento, getPedidoProdutos, resetDadosUsuario]);

  useEffect(() => {
    getProdutos();
  }, [getProdutos]);

  const modalVisible = useCallback(() => {
    setModal(true);
  }, []);

  const modalUnvisible = useCallback(() => {
    setModal(false);
  }, []);

  const data = useMemo(() => {
    const retorno = moment(dtpedido).format('DD/MM');

    return retorno;
  }, [dtpedido]);

  const horario = useMemo(() => {
    const retorno = moment(dtpedido).format('hh:mm');

    return retorno;
  }, [dtpedido]);

  const status = useMemo(() => {
    let retorno = '';
    if (entregue) {
      retorno = 'Não Devolvido X';
    } else {
      retorno = 'Não Entregue X';
    }

    return retorno;
  }, [entregue]);

  return (
    <div>
      <div className="flex justify-between">
        <Tooltip title="Imprimir Comprovante">
          <button type="button" className="text-base" onClick={modalVisible}>
            <i>
              <FilePdfOutlined translate="span" />
            </i>
          </button>
        </Tooltip>
        {!entregue && (
          <Tooltip title="Cancelar Pedido">
            <button
              type="button"
              className="mr-2 text-lg"
              onClick={removerPedido}
            >
              x
            </button>
          </Tooltip>
        )}
      </div>
      <div className="flex justify-between text-lg">
        <div>
          <p className="m-0">{`Dia ${data}`}</p>
          <p className="m-0">{`Horário ${horario}`}</p>
        </div>
        <div className="max-w-4xl">
          <p className="m-0">Produtos: </p>
          {state.produtos.map((produto) => (
            <span key={produto.idproduto}>{`${produto.nmproduto} `}</span>
          ))}
        </div>
        <div>
          <p className="m-0">Status </p>
          <TextStatus>{status}</TextStatus>
        </div>
      </div>
      <Modal
        visible={modal}
        onCancel={modalUnvisible}
        footer={null}
        destroyOnClose
        className="h-56"
      >
        <div className="pt-6">
          <MeusPedidosReport
            data={data}
            horario={horario}
            produtos={state.produtos}
            status={status}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MeusPedidosPedido;
