import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

import IPedidoFuncionario from '../../../Interfaces/IPedidoFuncionario';
import ButtonConfirm from '../../../Components/ButtonConfirm';
import useAcoesPedido from '../../../Hooks/useAcoesPedido';

const TextStatus = styled.span`
  color: var(--error-color);
`;

const PedidoPanelComponentWrapper = styled.div`
  .anticon {
    display: inline-flex;
  }
`;

interface IPedidoComponent {
  pedido: IPedidoFuncionario;
}

const PedidoPanelComponent: React.FC<IPedidoComponent> = ({
  pedido,
}: IPedidoComponent) => {
  const { setPedido } = useAcoesPedido();

  const data = useMemo(() => {
    let retorno = '';
    if (pedido.dataEntrega) {
      retorno = `${`00${pedido.dataEntrega.getUTCDate()}`.slice(
        -2,
      )}/${`00${pedido.dataEntrega.getUTCMonth()}`.slice(-2)}`;
    } else {
      retorno = `${`00${pedido.dataPedido.getUTCDate()}`.slice(
        -2,
      )}/${`00${pedido.dataPedido.getUTCMonth()}`.slice(-2)}`;
    }

    return retorno;
  }, [pedido.dataEntrega, pedido.dataPedido]);

  const horario = useMemo(() => {
    let retorno = '';
    if (pedido.dataEntrega) {
      retorno = `${`00${pedido.dataEntrega.getHours()}`.slice(
        -2,
      )}:${`00${pedido.dataEntrega.getMinutes()}`.slice(-2)}`;
    } else {
      retorno = `${`00${pedido.dataPedido.getHours()}`.slice(
        -2,
      )}:${`00${pedido.dataPedido.getMinutes()}`.slice(-2)}`;
    }

    return retorno;
  }, [pedido.dataEntrega, pedido.dataPedido]);

  const status = useMemo(() => {
    let retorno = '';
    if (pedido.dataEntrega) {
      retorno = 'Não Devolvido X';
    } else {
      retorno = 'Não Entregue X';
    }

    return retorno;
  }, [pedido.dataEntrega]);

  const textoBotao = useMemo(() => {
    let retorno = '';
    if (pedido.dataEntrega) {
      retorno = 'Confirmar Devolução';
    } else {
      retorno = 'Confirmar Entrega';
    }

    return retorno;
  }, [pedido.dataEntrega]);

  const onClickConfirma = useCallback(() => {
    setPedido(pedido);
  }, [pedido, setPedido]);

  return (
    <PedidoPanelComponentWrapper className="flex justify-between items-center text-lg">
      <div>
        {pedido.dataEntrega && <p className="m-0">Saiu:</p>}
        <p className="m-0">{`Dia ${data}`}</p>
        <p className="m-0">{`Horário ${horario}`}</p>
      </div>
      <div className="max-w-4xl">
        <p className="m-0">Cliente: </p>
        <p className="m-0">{pedido.cliente}</p>
      </div>
      <div className="flex flex-col">
        <p className="m-0">
          {'Status '}
          <TextStatus>{status}</TextStatus>
        </p>
        <ButtonConfirm
          onClick={onClickConfirma}
          className="w-56 p-2 items-center"
        >
          <span>{textoBotao}</span>
          <CheckCircleOutlined translate="span" className="ml-2" />
        </ButtonConfirm>
      </div>
    </PedidoPanelComponentWrapper>
  );
};

export default PedidoPanelComponent;
