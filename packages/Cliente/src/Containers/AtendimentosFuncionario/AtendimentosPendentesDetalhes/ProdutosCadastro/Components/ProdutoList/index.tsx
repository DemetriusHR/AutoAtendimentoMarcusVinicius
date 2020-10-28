import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useUsuarioContext } from '../../../../../../Context/Usuario';

import useProdutoListado from '../../../../../../Hooks/useProdutoListado';
import IPedidoProduto from '../../../../../../Interfaces/IPedidoProduto';

interface IProdutoList extends IPedidoProduto {
  removeProduto: (produto: IPedidoProduto) => void;
}

const Titulo = styled.p`
  color: var(--text-not-found-color);
`;

const ProdutoListComponent: React.FC<IProdutoList> = React.memo(
  ({
    id,
    idProduto,
    idAtendimento,
    detalhes,
    removeProduto,
  }: IProdutoList) => {
    const { resetDadosUsuario } = useUsuarioContext();
    const { state, getProduto } = useProdutoListado();

    useEffect(() => {
      getProduto(idProduto, resetDadosUsuario);
    }, [getProduto, idProduto, resetDadosUsuario]);

    const onClickButton = useCallback(() => {
      const produto = {
        id,
        idProduto,
        idAtendimento,
        detalhes,
      };

      removeProduto(produto);
    }, [id, idAtendimento, idProduto, detalhes, removeProduto]);

    return (
      <div className="shadow p-2">
        <div className="flex flex-row-reverse">
          <button type="button" onClick={onClickButton}>
            x
          </button>
        </div>
        <div className="w-full h-2" />
        <div>
          <Titulo className="text-xs">Produto</Titulo>
          <p className="text-sm">{state.produto.nmproduto}</p>
        </div>
        <div>
          <Titulo className="text-xs">Detalhes</Titulo>
          <p className="text-sm">{detalhes}</p>
        </div>
      </div>
    );
  },
);

export default ProdutoListComponent;
