import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import styled from 'styled-components';

import shadeColor from '../../../../Utils/ShadeColor';
import EnderecoListComponent from './Components/EnderecoList';
import { useUsuarioContext } from '../../../../Context/Usuario';
import useEnderecoCliente from '../../../../Hooks/useEnderecoCliente';
import DadosResidenciaisAdicionar from './Adicionar';

const ButtonAdicionar = styled.button`
  color: var(--sucess-color);

  :active {
    color: ${(props) => shadeColor(props.theme.sucessColor, -20)};
  }
`;

const EditAccountDadosResidenciais: React.FC = React.memo(() => {
  const [modal, setModal] = useState(false);
  const {
    usuario: { id },
    resetDadosUsuario,
  } = useUsuarioContext();
  const { state, getEnderecos } = useEnderecoCliente();

  useEffect(() => {
    if (id) {
      getEnderecos(id, resetDadosUsuario);
    }
  }, [getEnderecos, id, resetDadosUsuario]);

  const visible = useCallback(() => {
    setModal(true);
  }, []);

  const unvisible = useCallback(() => {
    setModal(false);
  }, []);

  return (
    <div className="py-8">
      <ButtonAdicionar onClick={visible}>+ Adicionar Endereço</ButtonAdicionar>
      <div className="w-full h-2" />
      {state.enderecos.length >= 1 && (
        <div className="py-4">
          <p className="text-base">
            {state.enderecos.length > 1
              ? 'Endereços Cadastrados'
              : 'Endereço Cadastrado'}
          </p>
          {state.enderecos.map((endereco) => (
            <EnderecoListComponent
              key={endereco.idendereco}
              visibleRemove={state.enderecos.length > 1}
              {...endereco}
            />
          ))}
          <div className="w-full h-2" />
        </div>
      )}
      <Modal
        title="Adicionar Endereço"
        visible={modal}
        onCancel={unvisible}
        footer={null}
        centered
        destroyOnClose
      >
        <DadosResidenciaisAdicionar close={visible} />
      </Modal>
    </div>
  );
});

export default EditAccountDadosResidenciais;
