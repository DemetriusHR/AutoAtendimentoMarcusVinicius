import React, { useCallback } from 'react';
import Modal from 'antd/lib/modal';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

import { useModaisContext } from '../../../Context/Modais';
import EditAccountDadosPessoais from './DadosPessoais';
import EditAccountDadosResidenciais from './DadosResidenciais';
import ButtonCancel from '../../../Components/ButtonCancel';
import { ExcluirUsuarioRequestAPI } from '../../../RequestAPI/Usuario';
import { useUsuarioContext } from '../../../Context/Usuario';

const ModalEditAccount: React.FC = React.memo(() => {
  const {
    usuario: { id },
    resetDadosUsuario,
  } = useUsuarioContext();
  const {
    modalEditAccountVisible,
    onModalEditAccountUnVisible,
  } = useModaisContext();

  const reset = useCallback(() => {
    resetDadosUsuario();
    onModalEditAccountUnVisible();
  }, [onModalEditAccountUnVisible, resetDadosUsuario]);

  const onOk = useCallback(() => {
    ExcluirUsuarioRequestAPI(id, reset);
  }, [id, reset]);

  const onClickLogOut = useCallback(() => {
    Modal.confirm({
      title: 'Deseja excluir sua conta mesmo?',
      icon: <DeleteOutlined translate="span" className="error-color" />,
      okText: 'Sim',
      cancelText: 'Não',
      okType: 'danger',
      cancelButtonProps: {
        className: 'button-not-sucess',
      },
      onOk,
    });
  }, [onOk]);

  return (
    <Modal
      title="Editar Perfil"
      visible={modalEditAccountVisible}
      onCancel={onModalEditAccountUnVisible}
      footer={null}
      centered
      destroyOnClose
    >
      <div className="py-8">
        <p>
          <span className="text-lg b-bottom-1">Dados Pessoais</span>
        </p>
        <EditAccountDadosPessoais />
        <p>
          <span className="text-lg b-bottom-1">Dados Residencias</span>
        </p>
        <EditAccountDadosResidenciais />
        <ButtonCancel
          className="w-full flex items-center"
          onClick={onClickLogOut}
        >
          <i className="flex items-center text-lg mr-2">
            <DeleteOutlined translate="span" />
          </i>
          <div className="inline-block">
            <span className="inline-block align-text-top">Excluir Conta</span>
          </div>
        </ButtonCancel>
      </div>
    </Modal>
  );
});

export default ModalEditAccount;
