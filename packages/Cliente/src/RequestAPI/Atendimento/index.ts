import Notification from 'antd/lib/notification';
import NotificationLogin from '../../Components/NotificationLogin';
import IAtendimentoPendente from '../../Interfaces/IAtendimentoPendente';
import IPedidoProduto from '../../Interfaces/IPedidoProduto';

import ConnectAPI from '../ConnectAPI';

function VerificarAtendimentoRequestAPI(
  dataEntrada = '',
  error: () => void,
  sucess: (entrada: boolean) => void,
): void {
  const body = JSON.stringify({
    data: dataEntrada,
  });
  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/verifica-horario`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro no Login!',
          description: `${data.message}`,
        });
        error();
      } else {
        sucess(data.data);
      }
    })
    .catch((e) => {
      error();
      Notification.error({
        message: 'Ocorreu um erro no Login!',
        description: `${e}`,
      });
    });
}

function AtendimentosPendentesRequestAPI(
  data = '',
  horarioInicial = '',
  horarioFinal = '',
  error: () => void,
  sucess: (entrada: IAtendimentoPendente[]) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const dataInicial = `${data} ${horarioInicial}`;
  const dataFinal = `${data} ${horarioFinal}`;

  const body = JSON.stringify({
    dataInicial,
    dataFinal,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/listagens/atendimentos-pendentes`, {
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
          message: 'Ocorreu um erro no Login!',
          description: `${dataRetornada.message}`,
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
        description: `${e}`,
      });
    });
}

function CancelarAtendimentoRequestAPI(
  idAtendimento = 0,
  fechaModal: () => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const body = JSON.stringify({
    idAtendimento,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/cancelar-atendimento`, {
    method: 'DELETE',
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
          message: 'Ocorreu um erro no Cancelamento do Pedido!',
          description: `${dataRetornada.message}`,
        });
      } else {
        fechaModal();
        Notification.success({
          message: 'Pedido cancelado com sucesso!',
        });
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro no Cancelamento do Pedido!',
        description: `${e}`,
      });
    });
}

function ConfirmarAtendimentoRequestAPI(
  idAtendimento: number,
  dataPedido: string,
  dataDevolucao: string,
  vlPedido = 200,
  produtos: IPedidoProduto[],
  fechaModal: () => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const body = JSON.stringify({
    idAtendimento,
    dataPedido,
    dataDevolucao,
    vlPedido,
    produtos,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/confirmar-atendimento`, {
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
          message: 'Ocorreu um erro na Confirmação do Pedido!',
          description: `${dataRetornada.message}`,
        });
      } else {
        fechaModal();
        Notification.success({
          message: 'Pedido confirmado com sucesso!',
        });
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro na Confirmação do Pedido!',
        description: `${e}`,
      });
    });
}

export {
  VerificarAtendimentoRequestAPI,
  AtendimentosPendentesRequestAPI,
  CancelarAtendimentoRequestAPI,
  ConfirmarAtendimentoRequestAPI,
};
