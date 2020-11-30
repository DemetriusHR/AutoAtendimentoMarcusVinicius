import Notification from 'antd/lib/notification';

import NotificationLogin from '../../Components/NotificationLogin';

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

  fetch(`${urlAPI}/acoes/verificar-horario`, {
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

export { VerificarAtendimentoRequestAPI, MarcarHorarioRequestAPI };
