import React, { useEffect, useMemo } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import IPedido from '../../Interfaces/IPedido';
import useProdutosPedidoCliente from '../../Hooks/useProdutosPedidoCliente';
import { useUsuarioContext } from '../../Context/Usuario';

const TextStatus = styled.span`
  color: var(--error-color);
`;

interface IMeusPedidosPedido {
  pedido: IPedido;
}

const MeusPedidosPedido: React.FC<IMeusPedidosPedido> = ({
  pedido: { idatendimento, dtpedido, entregue },
}: IMeusPedidosPedido) => {
  const { resetDadosUsuario } = useUsuarioContext();
  const { state, getPedidoProdutos } = useProdutosPedidoCliente();

  useEffect(() => {
    getPedidoProdutos(idatendimento, resetDadosUsuario);
  }, [idatendimento, getPedidoProdutos, resetDadosUsuario]);

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
  );
};

export default MeusPedidosPedido;
