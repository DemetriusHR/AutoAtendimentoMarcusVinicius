import IEntranceEndereco from 'shared/interfaces/entrances/endereco';

interface ILoginRepository {
  login: (cpf: string, tel: string, senha: string) => Promise<IResponseLogin>;
  cadastrar: (
    nome: string,
    cpf: string,
    tel: string,
    senha: string
  ) => Promise<IResponseLoginCadastrar>;
  cadastrarEnderecos: (
    id: number,
    enderecos: IEntranceEndereco[]
  ) => Promise<void>;
}

export default ILoginRepository;
