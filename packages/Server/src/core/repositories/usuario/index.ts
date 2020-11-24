import { autoInjectable, inject, singleton } from 'tsyringe';

import { Identifier } from '../../../config/injection/identifiers';
import IBDConnect from '../../../config/bdConnect/interface';
import IUsuarioRepository from '../../../config/interfaces/repositories/usuario';
import IResponseUsuarioListarEndereco from '../../../config/interfaces/response/usuario/listarendereco';
import IResponseUsuarioListarInformacoes from '../../../config/interfaces/response/usuario/listarinformacoes';

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
    const query: string = `UPDATE usuario
                           SET nm_usuario    = $2
                              ,cpf_usuario   = $3
                              ,tel_usuario   = $4
                              ,senha_usuario = $5
                           WHERE id_usuario  = $1`;
    const variables: (string | number)[] = [id, nome, cpf, celular, senha];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithinData(query, variables);
  }

  public async listarEnderecos(id: number): Promise<IResponseUsuarioListarEndereco[]> {
    const query: string = `SELECT Endereco_Usuario.id_endereco_usuario as idendereco
                                 ,concat(Endereco_Usuario.rua_endereco_usuario, ', ', Endereco_Usuario.no_endereco_usuario, ' ', Endereco_Usuario.cidade_endereco_usuario, '-', Endereco_Usuario.uf_endereco) as endereco
                           FROM Endereco_Usuario
                           WHERE id_usuario = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithDatas<IResponseUsuarioListarEndereco>(query, variables);
  }

  public async listarInformacoes(id: number): Promise<IResponseUsuarioListarInformacoes> {
    const query: string = `SELECT nm_usuario  AS nome
                         ,cpf_usuario AS cpf
                         ,tel_usuario AS celular
                   FROM usuario
                   WHERE id_usuario = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithData<IResponseUsuarioListarInformacoes>(query, variables);
  }
}

export default UsuarioRepository;
