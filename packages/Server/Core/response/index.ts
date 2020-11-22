import log from 'shared/logs';
import { Response } from 'express';
import IResponseAPI from 'shared/interfaces/response/api';
import { singleton } from 'tsyringe';

@singleton()
class ResponseAPI implements IResponseAPI {
  error(res: Response, e: Error) {
    log.error(e.toString());
    res.status(500).json({
      status: 500,
      message: e.toString(),
    });
  }

  errorBadRequest(res: Response, e: Error) {
    log.error(e.toString());
    res.status(400).json({
      status: 400,
      message: e.toString(),
    });
  }

  errorUnauthorized(res: Response) {
    log.error('Não Autorizado!');
    res.status(401).json({
      status: 401,
      message: 'Não Autorizado!',
    });
  }

  success(res: Response, data?: any) {
    log.info('ok');
    res.status(200).json({
      status: 200,
      message: 'ok',
      data,
    });
  }
}

export default ResponseAPI;
