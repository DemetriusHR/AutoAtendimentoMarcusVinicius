import * as format from 'pg-format';
import BDConnect from '../../../config/bdConnect';

import IBDConnect from '../../../config/bdConnect/interface';
import IEntranceEndereco from '../../../config/interfaces/entrances/endereco';
import ILoginRepository from '../../../config/interfaces/repositories/login';
import IResponseLoginCadastrar from '../../../config/interfaces/response/login/cadastrar';
import IResponseLogin from '../../../config/interfaces/response/login/login';
import IResponseLoginBD from '../../../config/interfaces/response/login/logindb';

class LoginRepository implements ILoginRepository {
  private bdConnect: IBDConnect;

  constructor() {
    this.bdConnect = new BDConnect();
  }

  public async cadastrar(
    nome: string,
    cpf: string,
    tel: string,
    senha: string
  ): Promise<IResponseLoginCadastrar> {
    const query: string = 'SELECT cadastrar_usuario($1, $2, $3, $4)';
    const variables: string[] = [nome, cpf, senha, tel];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithData<IResponseLoginCadastrar>(
      query,
      variables
    );
  }

  public async cadastrarEnderecos(
    id: number,
    enderecos: IEntranceEndereco[]
  ): Promise<void> {
    const enderecosMapeados: (
      | string
      | number
    )[][] = enderecos.map((endereco) => [
      endereco.rua_endereco_usuario,
      endereco.no_endereco_usuario,
      endereco.cidade_endereco_usuario,
      'SP',
      endereco.cep_endereco_usuario,
      endereco.complemento_endereco_usuario,
      id,
    ]);
    const query: string = format(
      `INSERT INTO endereco_usuario(rua_endereco_usuario
                                   ,no_endereco_usuario
                                   ,cidade_endereco_usuario
                                   ,uf_endereco
                                   ,cep_endereco_usuario
                                   ,complemento_endereco_usuario
                                   ,id_usuario)
       VALUES %L`,
      enderecosMapeados
    );
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, []);
  }

  public async login(
    senha: string,
    cpf?: string,
    tel?: string,
  ): Promise<IResponseLogin> {
    const query: string = 'SELECT login_atendimento($1, $2, $3)';
    const variables: string[] = [cpf, tel, senha];
    const bdConnect: IBDConnect = this.bdConnect;

    const result: IResponseLoginBD = await bdConnect.connectWithData<IResponseLoginBD>(
      query,
      variables
    );

    const login: string = result.login_atendimento;

    const idUsuario: number = parseInt(
      login.substring(1, login.indexOf(',')),
      10
    );

    const funcionario: boolean =
      login.substring(login.indexOf(',') + 1, login.indexOf(')')) === 't';

    return {
      idUsuario,
      funcionario,
    };
  }
}

export default LoginRepository;
