import Notification from 'antd/lib/notification';

import NotificationLogin from '../../Components/NotificationLogin';
import IProduto from '../../Interfaces/IProduto';
import IProdutoList from '../../Interfaces/IProdutoList';
import ConnectAPI from '../ConnectAPI';

function ProdutosRequestAPI(
  error: () => void,
  sucess: (entrada: IProdutoList[]) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
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
        NotificationLogin(onLogin);
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro na Listagem de Produtos!',
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
        message: 'Ocorreu um erro na Listagem de Produtos!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function ProdutoEspecificoRequestAPI(
  id: number,
  error: () => void,
  sucess: (entrada: IProdutoList) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/listagens/produto/${id}`, {
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
        NotificationLogin(onLogin);
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro na Listagem do Produto!',
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
        message: 'Ocorreu um erro na Listagem do Produto!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function PedidoPendenteClienteProdutosRequestAPI(
  idPedido: number,
  error: () => void,
  sucess: (entrada: IProdutoList[]) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/listagens/pedido-pendente/${idPedido}/produtos`, {
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
        NotificationLogin(onLogin);
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro na Listagem de Produtos!',
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
        message: 'Ocorreu um erro na Listagem de Produtos!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function PedidoPendenteProdutosRequestAPI(
  idPedido: number,
  error: () => void,
  sucess: (entrada: IProduto[]) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/listagens/pedido-pendente-funcionario/${idPedido}/produtos`, {
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
        NotificationLogin(onLogin);
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro na Listagem de Produtos!',
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
        message: 'Ocorreu um erro na Listagem de Produtos!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

export {
  ProdutosRequestAPI,
  ProdutoEspecificoRequestAPI,
  PedidoPendenteClienteProdutosRequestAPI,
  PedidoPendenteProdutosRequestAPI,
};
