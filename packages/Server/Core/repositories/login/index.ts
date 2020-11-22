import format from 'pg-format';
import { Identifier } from 'shared/injection/identifiers';
import IBDConnect from 'shared/interfaces/bdConnect/interface';
import IEntranceEndereco from 'shared/interfaces/entrances/endereco';
import ILoginRepository from 'shared/interfaces/repositories/login';
import IResponseLoginCadastrar from 'shared/interfaces/response/login/cadastrar';
import IResponseLogin from 'shared/interfaces/response/login/login';
import IResponseLoginBD from 'shared/interfaces/response/login/logindb';
import { autoInjectable, inject, singleton } from 'tsyringe';

@singleton()
@autoInjectable()
class LoginRepository implements ILoginRepository {
  private bdConnect: IBDConnect;

  constructor(
    @inject(Identifier.CONNECT)
    private poolConnect?: IBDConnect,
  ) {
    this.bdConnect = poolConnect;
  }

  public async cadastrar(
    nome: string,
    cpf: string,
    tel: string,
    senha: string
  ): Promise<IResponseLoginCadastrar> {
    const query = 'SELECT cadastrar_usuario($1, $2, $3, $4)';
    const variables = [nome, cpf, senha, tel];
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(
        await bdConnect.connectWithData<IResponseLoginCadastrar>(
          query,
          variables,
          reject
        )
      );
    });
  }

  public async cadastrarEnderecos(
    id: number,
    enderecos: IEntranceEndereco[]
  ): Promise<void> {
    const enderecosMapeados = enderecos.map((endereco) => [
      endereco.rua_endereco_usuario,
      endereco.no_endereco_usuario,
      endereco.cidade_endereco_usuario,
      'SP',
      endereco.cep_endereco_usuario,
      endereco.complemento_endereco_usuario,
      id,
    ]);
    const query = format(
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
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(await bdConnect.connectWithinData(query, null, reject));
    });
  }

  public async login(
    cpf: string,
    tel: string,
    senha: string
  ): Promise<IResponseLogin> {
    const query = 'SELECT login_atendimento($1, $2, $3)';
    const variables = [cpf, senha, tel];
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      const result = await bdConnect.connectWithData<IResponseLoginBD>(
        query,
        variables,
        reject
      );

      const { login_atendimento } = result;

      const idUsuario = parseInt(
        login_atendimento.substring(1, login_atendimento.indexOf(',')),
        10
      );

      const funcionario =
        login_atendimento.substring(
          login_atendimento.indexOf(',') + 1,
          login_atendimento.indexOf(')')
        ) === 't';

      resolve({
        idUsuario,
        funcionario,
      });
    });
  }
}

export default LoginRepository;
