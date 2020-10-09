import IImoveis from '../Intefaces/IImoveis';

interface ISaida {
  status: number;
  data: IImoveis[];
}

function RequestApiListagemImovel(): IImoveis[] {
  let dataReturn: IImoveis[] = [];

  fetch('http://localhost:3120/v1/listagens/imoveis', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data: ISaida) => {
      if (data.status === 200 && data) {
        dataReturn = !data.data ? dataReturn : data.data;
      }
    });

  return dataReturn;
}

function RequestApiCriarImovel(
  endereco: string,
  numero: number,
  cidade: string,
  estado: string,
  quartos: number,
  banheiros: number,
  detahes: string,
  tipoImovel: number,
  voidCall: () => void
) {
  const body: string = JSON.stringify({
    endereco,
    numero,
    cidade,
    estado,
    quartos,
    banheiros,
    detahes,
    tipoImovel,
  });

  fetch('http://localhost:3120/v1/acoes/imovel/criar', {
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
        voidCall();
      }
    });
}

function RequestApiEditarImovel(
  endereco: string,
  numero: number,
  cidade: string,
  estado: string,
  quartos: number,
  banheiros: number,
  detahes: string,
  tipoImovel: number,
  id: number,
  voidCall: () => void
) {
  const body: string = JSON.stringify({
    endereco,
    numero,
    cidade,
    estado,
    quartos,
    banheiros,
    detahes,
    tipoImovel,
    id,
  });

  fetch('http://localhost:3120/v1/acoes/imovel/editar', {
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
        voidCall();
      }
    });
}

function RequestApiDeletarImovel(id: number, alterRoute: () => void) {
  const body: string = JSON.stringify({
    id,
  });

  fetch('http://localhost:3120/v1/acoes/imovel/deletar', {
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
  RequestApiListagemImovel,
  RequestApiCriarImovel,
  RequestApiEditarImovel,
  RequestApiDeletarImovel,
};
