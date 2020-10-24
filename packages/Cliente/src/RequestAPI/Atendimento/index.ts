import Notification from 'antd/lib/notification';

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
      if (data.status === 400) {
        Notification.error({
          message: 'Ocorreu um erro no Login!',
          description: `Detalhes do erro: ${data.message}`,
        });
        error();
      } else if (data.status === 200) {
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

export { VerificaAtendimentoRequestAPI };
