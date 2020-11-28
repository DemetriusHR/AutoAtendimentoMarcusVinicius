import Notification from 'antd/lib/notification';
import IUsuario from '../../Interfaces/IUsuario';
import NotificationLogin from '../../Components/NotificationLogin';
import ConnectAPI from '../ConnectAPI';
import IEndereco from '../../Interfaces/IEndereco';

async function DadosUsuarioRequestAPI(id: number): Promise<IUsuario> {
  const token = localStorage.getItem('token');
  const urlAPI = ConnectAPI();

  return fetch(`${urlAPI}/listagens/usuario/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 200) {
        Notification.error({
          message: 'Ocorreu um erro na busca de dados!',
          description: `Detalhes do erro: ${data.message}`,
        });

        return {
          id: 0,
          celular: '',
          cpf: '',
          nome: 'Log In',
        };
      }

      if (data.status === 200 && data.data) {
        return { ...data.data[0], id };
      }

      return {
        id: 0,
        celular: '',
        cpf: '',
        nome: 'Log In',
      };
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro na busca de dados!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function EnderecosClienteRequestAPI(
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

function EditarUsuarioRequestAPI(
  id: number,
  nome: string,
  cpf: string,
  tel: string,
  senha: string,
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
    id,
    nome,
    cpf,
    tel,
    senha,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/usuario/editar`, {
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
        Notification.success({
          message: 'Edição de informações feita com sucesso!',
        });
        onSucess();
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro na edição das informações!',
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

function ExcluirUsuarioRequestAPI(id: number, onLogin: () => void): void {
  const idUsuario = localStorage.getItem('idUsuario');
  const token = localStorage.getItem('token');

  if (!idUsuario || !token) {
    NotificationLogin(onLogin);
    return;
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/usuario/${id}`, {
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
          message: 'Ocorreu um erro na exclusão do Usuário!',
          description: `${dataRetornada.message}`,
        });
      } else {
        onLogin();
        Notification.success({
          message: 'Usuário excluído com sucesso!',
        });
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro na exclusão do Usuário!',
        description: `${e}`,
      });
    });
}

function ExcluirEnderecoUsuarioRequestAPI(
  id: number,
  onLogin: () => void,
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
  DadosUsuarioRequestAPI,
  EnderecosClienteRequestAPI,
  EditarUsuarioRequestAPI,
  EditarEnderecoUsuarioRequestAPI,
  ExcluirUsuarioRequestAPI,
  ExcluirEnderecoUsuarioRequestAPI,
};
