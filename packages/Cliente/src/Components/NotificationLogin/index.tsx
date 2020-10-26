import React, { useCallback } from 'react';
import Notification from 'antd/lib/notification';

import ButtonConfirm from '../ButtonConfirm';
import { theme } from '../../Utils/Theme';
import { useUsuarioContext } from '../../Context/Usuario';
import { useModaisContext } from '../../Context/Modais';

interface IButtonLogin {
  onClick: () => void;
}

const ButtonLogin: React.FC<IButtonLogin> = React.memo(
  ({ onClick }: IButtonLogin) => (
    <div>
      <ButtonConfirm theme={theme} onClick={onClick}>
        Faça Login agora
      </ButtonConfirm>
    </div>
  ),
);

function NotificationLogin(onClick?: () => void): void {
  const { resetDadosUsuario } = useUsuarioContext();
  const { onModalLoginVisible } = useModaisContext();

  const onClickButtonLogin = useCallback(() => {
    if (!onClick) {
      onModalLoginVisible();
      resetDadosUsuario();
    } else {
      onClick();
    }
  }, [onClick, onModalLoginVisible, resetDadosUsuario]);

  Notification.warning({
    message: 'Você não está logado!',
    description: <ButtonLogin onClick={onClickButtonLogin} />,
  });
}

export default NotificationLogin;
