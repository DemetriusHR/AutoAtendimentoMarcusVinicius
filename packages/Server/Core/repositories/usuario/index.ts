import { Identifier } from 'shared/injection/identifiers';
import IBDConnect from 'shared/interfaces/bdConnect/interface';
import IUsuarioRepository from 'shared/interfaces/repositories/usuario';
import IResponseUsuarioListarEndereco from 'shared/interfaces/response/usuario/listarendereco';
import IResponseUsuarioListarInformacoes from 'shared/interfaces/response/usuario/listarinformacoes';
import { autoInjectable, inject, singleton } from 'tsyringe';

@singleton()
@autoInjectable()
class UsuarioRepository implements IUsuarioRepository {
  private bdConnect: IBDConnect;

  constructor(
    @inject(Identifier.CONNECT)
    private poolConnect?: IBDConnect,
  ) {
    this.bdConnect = poolConnect;
  }

  public async editar(
    id: number,
    nome: string,
    cpf: string,
    celular: string,
    senha: string
  ): Promise<void> {
    const query = `UPDATE usuario
                   SET nm_usuario    = $2
                      ,cpf_usuario   = $3
                      ,tel_usuario   = $4
                      ,senha_usuario = $5
                   WHERE id_usuario  = $1`;
    const variables = [id, nome, cpf, celular, senha];
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(await bdConnect.connectWithinData(query, variables, reject));
    });
  }

  public async listarEnderecos(id: number): Promise<IResponseUsuarioListarEndereco[]> {
    const query = `SELECT Endereco_Usuario.id_endereco_usuario as idendereco
                       ,concat(Endereco_Usuario.rua_endereco_usuario, ', ', Endereco_Usuario.no_endereco_usuario, ' ', Endereco_Usuario.cidade_endereco_usuario, '-', Endereco_Usuario.uf_endereco) as endereco
                   FROM Endereco_Usuario
                   WHERE id_usuario = $1`;
    const variables = [id];
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(await bdConnect.connectWithDatas<IResponseUsuarioListarEndereco>(query, variables, reject));
    });
  }

  public async listarInformacoes(id: number): Promise<IResponseUsuarioListarInformacoes> {
    const query = `SELECT nm_usuario  AS nome
                         ,cpf_usuario AS cpf
                         ,tel_usuario AS celular
                   FROM usuario
                   WHERE id_usuario = $1`;
    const variables = [id];
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(await bdConnect.connectWithData<IResponseUsuarioListarInformacoes>(query, variables, reject));
    });
  }
}

export default UsuarioRepository;
