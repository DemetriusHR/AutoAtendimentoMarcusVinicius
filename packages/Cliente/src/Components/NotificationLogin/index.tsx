import React from 'react';
import Notification from 'antd/lib/notification';

import ButtonConfirm from '../ButtonConfirm';
import { theme } from '../../Utils/Theme';

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

function NotificationLogin(onClick: () => void): void {
  Notification.warning({
    message: 'Você não está logado!',
    description: <ButtonLogin onClick={onClick} />,
  });
}

export default NotificationLogin;
