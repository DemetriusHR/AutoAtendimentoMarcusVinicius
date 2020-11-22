import IEntranceEndereco from 'shared/interfaces/entrances/endereco';
import IResponseLoginCadastrar from 'shared/interfaces/response/login/cadastrar';
import IResponseLogin from 'shared/interfaces/response/login/login';

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
