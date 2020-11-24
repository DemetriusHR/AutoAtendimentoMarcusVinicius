import IEntranceEndereco from '../../entrances/endereco';
import IResponseLoginCadastrar from '../../response/login/cadastrar';
import IResponseLogin from '../../response/login/login';

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
