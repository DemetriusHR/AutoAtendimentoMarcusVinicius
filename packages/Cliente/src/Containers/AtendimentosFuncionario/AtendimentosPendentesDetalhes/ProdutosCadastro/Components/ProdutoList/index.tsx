import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { IProduto } from '../../index';
import useProdutoListado from '../../../../../../Hooks/useProdutoListado';

interface IProdutoList extends IProduto {
  removeProduto: (produto: IProduto) => void;
}

const Titulo = styled.p`
  color: var(--text-not-found-color);
`;

const ProdutoListComponent: React.FC<IProdutoList> = React.memo(
  ({
    id,
    idProduto,
    detalhes,
    removeProduto,
  }: IProdutoList) => {
    const { state, getProduto } = useProdutoListado();

    useEffect(() => {
      getProduto(idProduto);
    }, [getProduto, idProduto]);

    const onClickButton = useCallback(() => {
      const produto = {
        id,
        idProduto,
        detalhes,
      };

      removeProduto(produto);
    }, [id, idProduto, detalhes, removeProduto]);

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
          <p className="text-sm">{state.produto.nmProduto}</p>
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
