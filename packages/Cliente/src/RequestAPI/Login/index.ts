import Notification from 'antd/lib/notification';

import ConnectAPI from '../ConnectAPI';
import { IEndereco } from '../../Pages/Modais/CreateLogin/DadosResidenciaisStep';

function LoginRequestAPI(
  cpf = '',
  tel = '',
  senha: string,
  getDados: () => void,
): void {
  let body = '';

  if (tel.length) {
    const telBody = tel.replace(/\D/g, '');

    body = JSON.stringify({
      tel: telBody,
      senha,
    });
  } else if (cpf.length) {
    const cpfBody = cpf.replace(/\D/g, '');

    body = JSON.stringify({
      cpf: cpfBody,
      senha,
    });
  }

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/login`, {
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
      } else if (data.status === 200 && data.data) {
        localStorage.setItem('idUsuario', data.data.loginVerify.idUsuario);
        localStorage.setItem('funcionario', data.data.loginVerify.funcionario);
        localStorage.setItem('token', data.data.token);

        getDados();
      }
    })
    .catch((e) => {
      Notification.error({
        message: 'Ocorreu um erro no Login!',
        description: `Detalhes do erro: ${e}`,
      });
    });
}

function CadastrarRequestAPI(
  nome: string,
  cpf: string,
  tel: string,
  senha: string,
  enderecos: IEndereco[],
  getDados: () => void,
): void {
  const body = JSON.stringify({
    nome,
    cpf,
    tel,
    senha,
    enderecos,
  });

  const urlAPI = ConnectAPI();

  fetch(`${urlAPI}/acoes/cadastrar`, {
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
          message: 'Ocorreu um erro no Cadastro!',
          description: `Detalhes do erro: ${data.message}`,
        });
      } else if (data.status === 200) {
        getDados();
        Notification.success({
          message: 'Perfil criado!',
          description: 'Faça o Login para continuar',
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

export { LoginRequestAPI, CadastrarRequestAPI };
