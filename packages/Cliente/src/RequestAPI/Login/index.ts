import Notification from 'antd/lib/notification';

import ConnectAPI from '../ConnectAPI';

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

export { LoginRequestAPI };
