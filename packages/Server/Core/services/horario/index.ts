import { Request, Response } from 'express';
import IResponseAPI from 'shared/interfaces/response/api';
import IHorarioService from 'shared/interfaces/services/horario';
import { singleton, autoInjectable, inject } from 'tsyringe';
import { Identifier } from '../../../shared/injection/identifiers';

import IHorarioRepository from '../../../shared/interfaces/repositories/horario';

@singleton()
@autoInjectable()
class HorarioService implements IHorarioService {
  private repository: IHorarioRepository;
  private response: IResponseAPI;

  constructor(
    @inject(Identifier.HORARIO_REPOSITORY)
    private injectRepository?: IHorarioRepository,
    @inject(Identifier.RESPONSE_API)
    private injectResponse?: IResponseAPI
  ) {
    this.repository = injectRepository;
    this.response = injectResponse;
  }

  public async marcar(req: Request, res: Response): Promise<void> {
    const { data, idUsuario } = req.body;

    await this.repository
      .marcar(data, idUsuario)
      .then(() => {
        this.response.success(res);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }

  public async verificar(req: Request, res: Response): Promise<void> {
    const { data } = req.body;

    await this.repository
      .verificar(data)
      .then((data) => {
        this.response.success(res, !!data);
      })
      .catch((err) => {
        this.response.error(res, err);
      });
  }
}

export default HorarioService;
