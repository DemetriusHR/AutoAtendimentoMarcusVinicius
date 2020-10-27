import Notification from 'antd/lib/notification';
import NotificationLogin from '../../Components/NotificationLogin';
import IAtendimentoPendente from '../../Interfaces/IAtendimentoPendente';
import IPedidoProduto from '../../Interfaces/IPedidoProduto';

import ConnectAPI from '../ConnectAPI';

function VerificaAtendimentoRequestAPI(
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
          description: `Detalhes do erro: ${data.message}`,
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
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function MarcarHorarioRequestAPI(
  dataEntrada = '',
  idUsuarioEntrada = 0,
  onLogin: () => void,
  verificaData: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  if (parseInt(idUsuario, 10) !== idUsuarioEntrada) {
    NotificationLogin(onLogin);
    return;
  }

  const body = JSON.stringify({
    data: dataEntrada,
    idUsuario: idUsuarioEntrada,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/marcar-horario`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro no Cadastro do Atendimento!',
          description: `Detalhes do erro: ${data.message}`,
        });
      } else {
        Notification.success({
          message: 'Atendimento Agendado',
        });
        verificaData();
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro no Cadastro do Atendimento!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function AtendimentosPendentesRequestAPI(
  data = '',
  horarioInicial = '',
  horarioFinal = '',
  error: () => void,
  sucess: (entrada: IAtendimentoPendente[]) => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin();
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

function CancelarPedidoRequestAPI(
  idAtendimento = 0,
  fechaModal: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin();
    return;
  }

  const body = JSON.stringify({
    idAtendimento,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/cancela-atendimento`, {
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
        NotificationLogin();
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro no Cancelamento do Pedido!',
          description: `Detalhes do erro: ${dataRetornada.message}`,
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
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function ConfirmarPedidoRequestAPI(
  idAtendimento: number,
  dataPedido: string,
  dataDevolucao: string,
  vlPedido = 200,
  produtos: IPedidoProduto[],
  fechaModal: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin();
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
        NotificationLogin();
      } else if (dataRetornada.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro na Confirmação do Pedido!',
          description: `Detalhes do erro: ${dataRetornada.message}`,
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
        description: `Detalhes do erro: ${e}`,
      });
    });
}

export {
  VerificaAtendimentoRequestAPI,
  MarcarHorarioRequestAPI,
  AtendimentosPendentesRequestAPI,
  CancelarPedidoRequestAPI,
  ConfirmarPedidoRequestAPI,
};
