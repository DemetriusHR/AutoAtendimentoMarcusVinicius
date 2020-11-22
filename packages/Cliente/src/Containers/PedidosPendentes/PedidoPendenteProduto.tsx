import React, { useEffect } from 'react';
import { useUsuarioContext } from '../../Context/Usuario';

import usePedidoProdutos from '../../Hooks/usePedidoProdutos';

interface IPedidoPendenteProduto {
  idPedido: number;
}

const PedidoPendenteProduto: React.FC<IPedidoPendenteProduto> = React.memo(
  ({ idPedido }: IPedidoPendenteProduto) => {
    const {
      usuario: { id },
      resetDadosUsuario,
    } = useUsuarioContext();
    const { state, getPedidoProdutos } = usePedidoProdutos();

    useEffect(() => {
      if (id) {
        getPedidoProdutos(idPedido, resetDadosUsuario);
      }
    }, [getPedidoProdutos, id, idPedido, resetDadosUsuario]);
    return (
      <div>
        {state.produtos.length ? (
          <p className="text-lg mt-2">Informações sobre o Pedido</p>
        ) : null}
        <div className="px-4 py-1">
          {state.produtos.length ? (
            <p className="text-base">
              {`${state.produtos.length > 1 ? 'Produtos' : 'Produto'}`}
            </p>
          ) : null}
          {state.produtos.map((produto) => (
            <div key={produto.idproduto} className="flex">
              <div className="flex-1">
                <h1 className="text-sm">Produto</h1>
                <p>{produto.nmproduto}</p>
              </div>
              <div className="flex-1">
                <h1 className="text-sm">Detalhes</h1>
                <p>{produto.detalhes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default PedidoPendenteProduto;
