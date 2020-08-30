function RequestApiLogin(
  login: string,
  senha: string,
  alterRoute: () => void
) {
  const body: string = JSON.stringify({
    login,
    senha,
  });

  fetch('http://localhost:3120/v1/acoes/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200 && data.data) {
        sessionStorage.setItem('logado', 's');
        alterRoute();
      }
    });
}

function RequestApiCriarLogin(
  nome: string,
  login: string,
  senha: string,
  situacao = 0,
  alterRoute: () => void
) {
  const body: string = JSON.stringify({
    nome,
    login,
    senha,
    situacao,
  });

  fetch('http://localhost:3120/v1/acoes/login/criar', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200 && data) {
        alterRoute();
      }
    });
}

function RequestApiEditarLogin(
  nome: string,
  login: string,
  senha: string,
  situacao = 0,
  id: number,
  alterRoute: () => void
) {
  const body: string = JSON.stringify({
    nome,
    login,
    senha,
    situacao,
    id,
  });

  fetch('http://localhost:3120/v1/acoes/login/editar', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200 && data) {
        alterRoute();
      }
    });
}

export { RequestApiLogin, RequestApiCriarLogin, RequestApiEditarLogin };
