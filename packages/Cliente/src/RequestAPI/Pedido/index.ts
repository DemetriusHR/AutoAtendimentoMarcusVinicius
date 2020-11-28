import Notification from 'antd/lib/notification';
import NotificationLogin from '../../Components/NotificationLogin';
import IAtendimentoPendente from '../../Interfaces/IAtendimentoPendente';
import IPedido from '../../Interfaces/IPedido';
import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';
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
          description: `${data.message}`,
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

function CancelarPedidoRequestAPI(
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

function ConfirmarPedidoRequestAPI(
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

function PedidoPendenteConfirmaEntregueRequestAPI(
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

function PedidoPendenteConfirmaDevolucaoRequestAPI(
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
  VerificaAtendimentoRequestAPI,
  MarcarHorarioRequestAPI,
  AtendimentosPendentesRequestAPI,
  CancelarPedidoRequestAPI,
  ConfirmarPedidoRequestAPI,
  PedidosPendentesClienteRequestAPI,
  PedidosPendentesRequestAPI,
  PedidoPendenteConfirmaEntregueRequestAPI,
  PedidoPendenteConfirmaDevolucaoRequestAPI,
};
