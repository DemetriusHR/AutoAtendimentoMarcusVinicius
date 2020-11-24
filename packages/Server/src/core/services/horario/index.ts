import { Request, Response } from 'express';
import { DateSchema } from 'joi';

import IResponseAPI from '../../../config/interfaces/response/api';
import IHorarioService from '../../../config/interfaces/services/horario';
import IHorarioRepository from '../../../config/interfaces/repositories/horario';
import HorarioRepository from '../../repositories/horario';
import ResponseAPI from '../../response';


const repository: IHorarioRepository = new HorarioRepository();
const response: IResponseAPI = new ResponseAPI();

class HorarioService implements IHorarioService {
  public async marcar(req: Request, res: Response): Promise<void> {
    const data: DateSchema = req.body.data;
    const idUsuario: number = req.body.idUsuario;

    await repository
      .marcar(data, idUsuario)
      .then(() => {
        response.success(res);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }

  public async verificar(req: Request, res: Response): Promise<void> {
    const data: DateSchema = req.body.data;

    await repository
      .verificar(data)
      .then((data) => {
        response.success(res, !!data);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }
}

export default HorarioService;
