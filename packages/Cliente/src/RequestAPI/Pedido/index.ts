import Notification from 'antd/lib/notification';

import NotificationLogin from '../../Components/NotificationLogin';
import IPedido from '../../Interfaces/IPedido';
import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';

import ConnectAPI from '../ConnectAPI';

function PedidosPendentesClienteRequestAPI(
  idCliente: number,
  error: () => void,
  sucess: (entrada: IPedido[]) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token || parseInt(idUsuario, 10) !== idCliente) {
    sucess([]);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/listagens/pedidos-pendentes/${idCliente}`, {
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
          message: 'Ocorreu um erro na listagem dos Pedidos Pendentes!',
          description: `${dataRetornada.message}`,
        });
      } else {
        sucess(dataRetornada.data);
      }
    })
    .catch((e) => {
      error();
      Notification.error({
        message: 'Ocorreu um erro na listagem dos Pedidos Pendentes!',
        description: `${e}`,
      });
    });
}

function CancelarPedidosPendentesClienteRequestAPI(
  idPedido: number,
  error: () => void,
  sucess: (entrada: IPedido[]) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/pedidos-pendentes/${idPedido}/cancelar`, {
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
          message: 'Ocorreu um erro no cancelamento do Pedido Pendente!',
          description: `${dataRetornada.message}`,
        });
      } else {
        sucess(dataRetornada.data);
      }
    })
    .catch((e) => {
      error();
      Notification.error({
        message: 'Ocorreu um erro no cancelamento do Pedido Pendente!',
        description: `${e}`,
      });
    });
}

function PedidosPendentesRequestAPI(
  error: () => void,
  sucess: (entrada: IPedidoFuncionario[]) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/listagens/pedidos-pendentes`, {
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
          message: 'Ocorreu um erro na listagem dos Pedidos Pendentes!',
          description: `${dataRetornada.message}`,
        });
      } else {
        sucess(dataRetornada.data);
      }
    })
    .catch((e) => {
      error();
      Notification.error({
        message: 'Ocorreu um erro na listagem dos Pedidos Pendentes!',
        description: `${e}`,
      });
    });
}

function PedidoPendenteConfirmarEntregueRequestAPI(
  idPedido: number,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const body = JSON.stringify({
    idPedido,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/pedido-pendente/confirma-entrega`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then((response) => response.json())
    .then((dataRetornada) => {
      if (dataRetornada.status === 401) {
        NotificationLogin(onLogin);
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message:
            'Ocorreu um erro na confirmação da entrega do pedido pendente!',
          description: `${dataRetornada.message}`,
        });
      } else {
        Notification.success({
          message: 'Pedido entregue com sucesso!',
        });
      }
    })
    .catch((e) => {
      Notification.error({
        message:
          'Ocorreu um erro na confirmação da entrega do pedido pendente!',
        description: `${e}`,
      });
    });
}

function PedidoPendenteConfirmarDevolucaoRequestAPI(
  idPedido: number,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const body = JSON.stringify({
    idPedido,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/pedido-pendente/confirma-devolucao`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then((response) => response.json())
    .then((dataRetornada) => {
      if (dataRetornada.status === 401) {
        NotificationLogin(onLogin);
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro na confirmação da devolução do pedido!',
          description: `${dataRetornada.message}`,
        });
      } else {
        Notification.success({
          message: 'Pedido devolvido com sucesso!',
        });
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro na confirmação da devolução do pedido!',
        description: `${e}`,
      });
    });
}

export {
  PedidosPendentesClienteRequestAPI,
  PedidosPendentesRequestAPI,
  PedidoPendenteConfirmarEntregueRequestAPI,
  PedidoPendenteConfirmarDevolucaoRequestAPI,
  CancelarPedidosPendentesClienteRequestAPI,
};
