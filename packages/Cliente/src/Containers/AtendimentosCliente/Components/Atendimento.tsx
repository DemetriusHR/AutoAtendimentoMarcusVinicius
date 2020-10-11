import React, {
  useMemo,
} from 'react';
import styled from 'styled-components';

import IPedido from '../../../Interfaces/IPedido';

const TextStatus = styled.span`
  color: var(
    --error-color
  );
`;

interface IPedidoComponent {
  pedido: IPedido;
}

const PedidoComponent: React.FC<IPedidoComponent> = ({
  pedido: {
    dataPedido,
    dataEntrega,
  },
}: IPedidoComponent) => {
  const data = useMemo(() => {
    let dataRetornada = '';
    if (
      dataEntrega
    ) {
      dataRetornada = `${`00${dataEntrega.getUTCDate()}`.slice(-2)}
      /${`00${dataEntrega.getUTCMonth()}`.slice(-2)}`;
    } else {
      dataRetornada = `${`00${dataPedido.getUTCDate()}`.slice(-2)}
      /${`00${dataPedido.getUTCMonth()}`.slice(-2)}`;
    }

    return dataRetornada;
  }, [
    dataEntrega,
    dataPedido,
  ]);

  const horario = useMemo(() => {
    let horarioRetornado = '';
    if (
      dataEntrega
    ) {
      horarioRetornado = `${`00${dataEntrega.getHours()}`.slice(-2)}
      :${`00${dataEntrega.getMinutes()}`.slice(-2)}`;
    } else {
      horarioRetornado = `${`00${dataPedido.getHours()}`.slice(-2)}
      :${`00${dataPedido.getMinutes()}`.slice(-2)}`;
    }

    return horarioRetornado;
  }, [
    dataEntrega,
    dataPedido,
  ]);

  const status = useMemo(() => {
    let retorno = '';
    if (
      dataEntrega
    ) {
      retorno = 'Não Devolvido X';
    } else {
      retorno = 'Não Entregue X';
    }

    return retorno;
  }, [
    dataEntrega,
  ]);

  return (
    <div className="flex justify-between text-lg">
      <div>
        <p className="m-0">
          Dia
          {' '}
          {
            data
          }
        </p>
        <p className="m-0">
          Horário
          {' '}
          {
            horario
          }
        </p>
      </div>
      <div className="max-w-4xl">
        <p className="m-0">
          Produtos:
          {' '}
        </p>
      </div>
      <div>
        <p className="m-0">
          Status
          {' '}
        </p>
        <TextStatus>
          {
            status
          }
        </TextStatus>
      </div>
    </div>
  );
};

export default PedidoComponent;
