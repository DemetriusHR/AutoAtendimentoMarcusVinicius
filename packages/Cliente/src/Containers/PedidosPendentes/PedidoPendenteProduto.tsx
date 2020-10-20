import React, { useEffect } from 'react';

import usePedidoProdutos from '../../Hooks/usePedidoProdutos';

interface IPedidoPendenteProduto {
  idPedido: number;
}

const PedidoPendenteProduto: React.FC<IPedidoPendenteProduto> = React.memo(
  ({ idPedido }: IPedidoPendenteProduto) => {
    const { state, getPedidoProdutos } = usePedidoProdutos();

    useEffect(() => {
      getPedidoProdutos(idPedido);
    }, [getPedidoProdutos, idPedido]);
    return (
      <div className="p-4">
        {state.produtos.map((produto) => (
          <div key={produto.idProduto} className="flex">
            <div className="flex-1">
              <h1 className="text-sm">Produto</h1>
              <p>{produto.nmProduto}</p>
            </div>
            <div className="flex-1">
              <h1 className="text-sm">Detalhes</h1>
              <p>{produto.detalhesProduto}</p>
            </div>
          </div>
        ))}
      </div>
    );
  },
);

export default PedidoPendenteProduto;
