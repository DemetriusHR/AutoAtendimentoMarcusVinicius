import Notification from 'antd/lib/notification';

import NotificationLogin from '../../Components/NotificationLogin';
import IProdutoList from '../../Interfaces/IProdutoList';
import ConnectAPI from '../ConnectAPI';

function ProdutosRequestAPI(
  error: () => void,
  sucess: (entrada: IProdutoList[]) => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin();
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/listagens/produtos`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((dataRetornada) => {
      if (dataRetornada.status === 401) {
        NotificationLogin();
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro no Login!',
          description: `Detalhes do erro: ${dataRetornada.message}`,
        });
        error();
      } else {
        sucess(dataRetornada.data);
      }
    })
    .catch((e) => {
      error();
      Notification.error({
        message: 'Ocorreu um erro no Login!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

export { ProdutosRequestAPI };
