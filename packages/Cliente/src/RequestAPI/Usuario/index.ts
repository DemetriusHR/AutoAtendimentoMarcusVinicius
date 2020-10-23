import Notification from 'antd/lib/notification';
import IUsuario from '../../Interfaces/IUsuario';

import ConnectAPI from '../ConnectAPI';

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
      if (data.status === 400) {
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

export { DadosUsuarioRequestAPI };
