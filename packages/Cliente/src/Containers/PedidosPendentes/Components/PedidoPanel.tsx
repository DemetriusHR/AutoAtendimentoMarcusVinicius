import React, { useCallback, useMemo } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

import IPedidoFuncionario from '../../../Interfaces/IPedidoFuncionario';
import ButtonConfirm from '../../../Components/ButtonConfirm';
import {
  PedidoPendenteConfirmarEntregueRequestAPI,
  PedidoPendenteConfirmarDevolucaoRequestAPI,
} from '../../../RequestAPI/Pedido';
import { useUsuarioContext } from '../../../Context/Usuario';

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
  loadPedidos: () => void;
}

const PedidoPanelComponent: React.FC<IPedidoComponent> = ({
  pedido: {
    dtpedido,
    entregue,
    idatendimento,
    nomecliente,
  },
  loadPedidos,
}: IPedidoComponent) => {
  const { resetDadosUsuario } = useUsuarioContext();

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

  const textoBotao = useMemo(() => {
    let retorno = '';
    if (entregue) {
      retorno = 'Confirmar Devolução';
    } else {
      retorno = 'Confirmar Entrega';
    }

    return retorno;
  }, [entregue]);

  const onClickConfirmar = useCallback(() => {
    if (entregue) {
      PedidoPendenteConfirmarDevolucaoRequestAPI(idatendimento, resetDadosUsuario, loadPedidos);
    } else {
      PedidoPendenteConfirmarEntregueRequestAPI(idatendimento, resetDadosUsuario, loadPedidos);
    }
  }, [idatendimento, entregue, resetDadosUsuario, loadPedidos]);

  return (
    <PedidoPanelComponentWrapper className="flex justify-between items-center text-lg">
      <div>
        {entregue && <p className="m-0">Saiu:</p>}
        <p className="m-0">{`Dia ${data}`}</p>
        <p className="m-0">{`Horário ${horario}`}</p>
      </div>
      <div className="max-w-4xl">
        <p className="m-0">Cliente: </p>
        <p className="m-0">{nomecliente}</p>
      </div>
      <div className="flex flex-col">
        <p className="m-0">
          {'Status '}
          <TextStatus>{status}</TextStatus>
        </p>
        <ButtonConfirm
          onClick={onClickConfirmar}
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
