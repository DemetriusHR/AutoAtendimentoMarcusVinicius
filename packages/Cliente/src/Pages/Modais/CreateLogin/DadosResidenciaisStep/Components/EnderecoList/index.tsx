import React, { useCallback } from 'react';
import styled from 'styled-components';

import { IEndereco } from '../../index';

interface IEnderecoList extends IEndereco {
  removeEndereco: (endereco: IEndereco) => void;
}

const Titulo = styled.p`
  color: var(--text-not-found-color);
`;

const EnderecoListComponent: React.FC<IEnderecoList> = React.memo(
  ({
    id,
    rua_endereco_usuario: rua,
    no_endereco_usuario: no,
    complemento_endereco_usuario: complemento,
    cep_endereco_usuario: cep,
    cidade_endereco_usuario: cidade,
    removeEndereco,
  }: IEnderecoList) => {
    const onClickButton = useCallback(() => {
      const endereco = {
        id,
        rua_endereco_usuario: rua,
        no_endereco_usuario: no,
        complemento_endereco_usuario: complemento,
        cep_endereco_usuario: cep,
        cidade_endereco_usuario: cidade,
      };

      removeEndereco(endereco);
    }, [id, cep, cidade, complemento, no, removeEndereco, rua]);

    return (
      <div className="shadow p-2">
        <div className="flex flex-row-reverse">
          <button type="button" onClick={onClickButton}>
            x
          </button>
        </div>
        <div className="w-full h-2" />
        <div>
          <Titulo className="text-xs">Endereço</Titulo>
          <p className="text-sm">{`${rua}, N° ${no}`}</p>
        </div>
        <div className="flex">
          <div className="flex-1">
            <Titulo className="text-xs">Complemento</Titulo>
            <p className="text-sm">{complemento}</p>
          </div>
          <div className="flex-1">
            <Titulo className="text-xs">CEP</Titulo>
            <p className="text-sm">{cep}</p>
          </div>
        </div>
        <div>
          <Titulo className="text-xs">Cidade</Titulo>
          <p className="text-sm">{cidade}</p>
        </div>
      </div>
    );
  },
);

export default EnderecoListComponent;
