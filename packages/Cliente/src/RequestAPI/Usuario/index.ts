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

export { DadosUsuarioRequestAPI, EnderecosClienteRequestAPI };
