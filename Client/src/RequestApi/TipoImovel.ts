import ITipoImoveis from '../Intefaces/ITipoImoveis';

function RequestApiListagemTipoImovel(): ITipoImoveis[] {
  let dataReturn: ITipoImoveis[] = [];

  fetch('http://localhost:3120/v1/listagens/tipo-usuario', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status === 200 && data) {
        dataReturn = !data.data ? dataReturn : data.data;
      }
    });

  return dataReturn;
}

function RequestApiCriarTipoImovel(
  nome: string,
  status: string,
  alterRoute: () => void
) {
  const body: string = JSON.stringify({
    nome,
    status,
  });

  fetch('http://localhost:3120/v1/acoes/tipo-imovel/criar', {
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

function RequestApiEditarTipoImovel(
  nome: string,
  status: string,
  id: number,
  alterRoute: () => void
) {
  const body: string = JSON.stringify({
    nome,
    status,
    id,
  });

  fetch('http://localhost:3120/v1/acoes/tipo-imovel/editar', {
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

function RequestApiDeletarTipoImovel(id: number, alterRoute: () => void) {
  const body: string = JSON.stringify({
    id,
  });

  fetch('http://localhost:3120/v1/acoes/tipo-imovel/deletar', {
    method: 'DELETE',
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

export {
  RequestApiListagemTipoImovel,
  RequestApiCriarTipoImovel,
  RequestApiEditarTipoImovel,
  RequestApiDeletarTipoImovel,
};
