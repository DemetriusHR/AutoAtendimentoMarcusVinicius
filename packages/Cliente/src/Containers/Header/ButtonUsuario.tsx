import React, { useCallback, useMemo } from 'react';
import Popover from 'antd/lib/popover';
import Modal from 'antd/lib/modal';
import UserOutlined from '@ant-design/icons/UserOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import PoweroffOutlined from '@ant-design/icons/PoweroffOutlined';

import { useModaisContext } from '../../Context/Modais';
import { useUsuarioContext } from '../../Context/Usuario';
import ButtonConfirm from '../../Components/ButtonConfirm';
import ButtonCancel from '../../Components/ButtonCancel';

const ButtonUsuarioHeader: React.FC = React.memo(() => {
  const {
    usuario: {
      id,
      nome,
      celular,
      cpf,
    },
    resetDadosUsuario,
  } = useUsuarioContext();
  const { onModalLoginVisible } = useModaisContext();

  const nomeRetornado = useMemo(() => {
    if (nome === 'Log In' && !id) {
      return nome;
    }

    return `Olá, ${nome.split(' ')[0]}`;
  }, [id, nome]);

  const onClickLogOut = useCallback(() => {
    Modal.confirm({
      title: 'Deseja sair mesmo?',
      okText: 'Sim',
      cancelText: 'Não',
      onOk: resetDadosUsuario,
    });
  }, [resetDadosUsuario]);

  if (nome === 'Log In' && !id) {
    return (
      <button
        className="flex items-center cursor-pointer"
        onClick={onModalLoginVisible}
        type="button"
      >
        <div className="mr-2 inline-block">
          <span className="inline-block align-text-top">{nomeRetornado}</span>
        </div>
        <i className="flex items-center text-lg">
          <UserOutlined className="align-text-top" translate="span" />
        </i>
      </button>
    );
  }

  return (
    <Popover
      placement="bottomRight"
      title={nome}
      content={(
        <div>
          <p>{`Celular: ${celular}`}</p>
          <p>{`CPF: ${cpf}`}</p>
          <ButtonConfirm className="w-full my-2 flex items-center">
            <i className="flex items-center text-lg mr-2">
              <EditOutlined translate="span" />
            </i>
            <div className="inline-block">
              <span className="inline-block align-text-top">Editar Perfil</span>
            </div>
          </ButtonConfirm>
          <ButtonCancel
            className="w-full flex items-center"
            onClick={onClickLogOut}
          >
            <i className="flex items-center text-lg mr-2">
              <PoweroffOutlined translate="span" />
            </i>
            <div className="inline-block">
              <span className="inline-block align-text-top">Sair</span>
            </div>
          </ButtonCancel>
        </div>
      )}
      trigger="click"
    >
      <button className="flex items-center cursor-pointer" type="button">
        <div className="mr-2 inline-block">
          <span className="inline-block align-text-top">{nomeRetornado}</span>
        </div>
        <i className="flex items-center text-lg">
          <UserOutlined className="align-text-top" translate="span" />
        </i>
      </button>
    </Popover>
  );
});

export default ButtonUsuarioHeader;
