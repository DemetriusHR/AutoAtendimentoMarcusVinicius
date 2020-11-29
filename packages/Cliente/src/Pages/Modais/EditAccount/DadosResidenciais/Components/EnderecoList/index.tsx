import React, { useCallback, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import styled from 'styled-components';
import EditOutlined from '@ant-design/icons/EditOutlined';

import { useUsuarioContext } from '../../../../../../Context/Usuario';
import IEndereco from '../../../../../../Interfaces/IEndereco';
import { ExcluirEnderecoUsuarioRequestAPI } from '../../../../../../RequestAPI/Endereco';
import DadosResidenciaisEditar from '../../Editar';

interface IEnderecoList extends IEndereco {
  visibleRemove: boolean;
}

const Titulo = styled.p`
  color: var(--text-not-found-color);
`;

const EnderecoListComponent: React.FC<IEnderecoList> = ({
  idendereco,
  rua,
  cidade,
  complemento,
  numero,
  cep,
  visibleRemove,
}: IEnderecoList) => {
  const [modal, setModal] = useState(false);
  const { resetDadosUsuario } = useUsuarioContext();

  const remove = useCallback(() => {
    ExcluirEnderecoUsuarioRequestAPI(idendereco, resetDadosUsuario);
  }, [idendereco, resetDadosUsuario]);

  const visible = useCallback(() => {
    setModal(true);
  }, []);

  const unvisible = useCallback(() => {
    setModal(false);
  }, []);

  return (
    <div className="shadow p-2">
      <div className="flex flex-row-reverse">
        {visibleRemove && (
          <button type="button" onClick={remove}>
            x
          </button>
        )}
        <button type="button" onClick={visible}>
          <i className="flex items-center text-lg mr-2">
            <EditOutlined translate="span" />
          </i>
        </button>
      </div>
      <div className="w-full h-2" />
      <div>
        <Titulo className="text-xs">Endereço</Titulo>
        <p className="text-sm">{`${rua}, N° ${numero}`}</p>
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
      <Modal
        title="Editar Endereço"
        visible={modal}
        onCancel={unvisible}
        footer={null}
        centered
        destroyOnClose
      >
        <DadosResidenciaisEditar
          close={unvisible}
          idendereco={idendereco}
          rua={rua}
          cidade={cidade}
          complemento={complemento}
          numero={numero}
          cep={cep}
        />
      </Modal>
    </div>
  );
};
export default EnderecoListComponent;
