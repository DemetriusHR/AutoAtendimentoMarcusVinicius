import { Request, Response } from 'express';
import { autoInjectable, inject, singleton } from 'tsyringe';

import { Identifier } from '../../../config/injection/identifiers';
import IUsuarioRepository from '../../../config/interfaces/repositories/usuario';
import IResponseAPI from '../../../config/interfaces/response/api';
import IUsuarioService from '../../../config/interfaces/services/usuario';

@singleton()
@autoInjectable()
class UsuarioService implements IUsuarioService {
  private repository: IUsuarioRepository;
  private response: IResponseAPI;

  constructor(
    @inject(Identifier.USUARIO_REPOSITORY)
    private injectRepository?: IUsuarioRepository,
    @inject(Identifier.RESPONSE_API)
    private injectResponse?: IResponseAPI
  ) {
    this.repository = injectRepository;
    this.response = injectResponse;
  }

  public async editar(req: Request, res: Response): Promise<void> {
    const { id, nome, cpf, celular, senha } = req.body;

    this.repository
      .editar(id, nome, cpf, celular, senha)
      .then(() => {
        this.response.success(res);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }

  public async listarEnderecos(req: Request, res: Response): Promise<void> {
    const idUsuario = parseInt(req.params.id, 10);

    this.repository
      .listarEnderecos(idUsuario)
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.success(res, err);
      });
  }

  public async listarInformacoes(req: Request, res: Response): Promise<void> {
    const idUsuario = parseInt(req.params.id, 10);

    this.repository
      .listarInformacoes(idUsuario)
      .then((data) => {
        this.response.success(res, data);
      })
      .catch((err) => {
        this.response.success(res, err);
      });
  }
}

export default UsuarioService;
