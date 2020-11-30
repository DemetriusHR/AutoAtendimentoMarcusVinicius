import Notification from 'antd/lib/notification';
import NotificationLogin from '../../Components/NotificationLogin';
import IEndereco from '../../Interfaces/IEndereco';

import ConnectAPI from '../ConnectAPI';

function CadastrarEnderecoRequestAPI(
  idUsuarioIn: number,
  rua: string,
  numero: number,
  cidade: string,
  cep: string,
  complemento: string,
  onLogin: () => void,
  onSucess: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const body = JSON.stringify({
    idUsuario: idUsuarioIn,
    rua,
    numero,
    cidade,
    cep,
    complemento,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/usuario/endereco`, {
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
          message: 'Ocorreu um erro no Cadastro!',
          description: `Detalhes do erro: ${data.message}`,
        });
      } else if (data.status === 200) {
        onSucess();
        Notification.success({
          message: 'Endereço cadastrado com sucesso!',
        });
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro no Cadastro!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function EnderecosUsuarioRequestAPI(
  id: number,
  error: () => void,
  sucess: (entrada: IEndereco[]) => void,
  onLogin: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/listagens/usuario/${id}/enderecos`, {
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
          message: 'Ocorreu um erro na listagem dos Endereços do Usuário!',
          description: `${dataRetornada.message}`,
        });
      } else {
        sucess(dataRetornada.data);
      }
    })
    .catch((e) => {
      error();
      Notification.error({
        message: 'Ocorreu um erro na listagem dos Endereços do Usuário!',
        description: `${e}`,
      });
    });
}

function EditarEnderecoUsuarioRequestAPI(
  id: number,
  rua: string,
  numero: number,
  cidade: string,
  cep: string,
  idUsuarioIn: number,
  onLogin: () => void,
  onSucess: () => void,
  complemento = '',
): void {
  const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10);
  const token = localStorage.getItem('token');

  if (idUsuario !== idUsuarioIn || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const body = JSON.stringify({
    id,
    rua,
    numero,
    cidade,
    cep,
    // eslint-disable-next-line
    complemento: complemento ? complemento : '',
    idUsuario,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/usuario/endereco/editar`, {
    method: 'PUT',
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
          message: 'Ocorreu um erro na edição das informações!',
          description: `${dataRetornada.message}`,
        });
      } else {
        onSucess();
        Notification.success({
          message: 'Edição de informações feita com sucesso!',
        });
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro na edição das informações!',
        description: `${e}`,
      });
    });
}

function ExcluirEnderecoUsuarioRequestAPI(
  id: number,
  onLogin: () => void,
  onFinish: () => void,
): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/usuario/endereco/${id}`, {
    method: 'DELETE',
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
          message: 'Ocorreu um erro na exclusão do endereço do usuário!',
          description: `${dataRetornada.message}`,
        });
      } else {
        Notification.success({
          message: 'Endereço do usuário excluído com sucesso!',
        });
        onFinish();
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro na exclusão do endereço do usuário!',
        description: `${e}`,
      });
    });
}

export {
  CadastrarEnderecoRequestAPI,
  EnderecosUsuarioRequestAPI,
  EditarEnderecoUsuarioRequestAPI,
  ExcluirEnderecoUsuarioRequestAPI,
};
