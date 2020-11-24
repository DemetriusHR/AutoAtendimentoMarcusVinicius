import { Response } from 'express';
// import log from 'shared/logs';
import IResponseAPI from '../../config/interfaces/response/api';

class ResponseAPI implements IResponseAPI {
  error(res: Response, e: Error): void {
    // log.error(e.toString());
    res.status(500).json({
      status: 500,
      message: e.toString(),
    });
  }

  errorBadRequest(res: Response, e: Error): void {
    // log.error(e.toString());
    res.status(400).json({
      status: 400,
      message: e.toString(),
    });
  }

  errorUnauthorized(res: Response): void {
    // log.error('Não Autorizado!');
    res.status(401).json({
      status: 401,
      message: 'Não Autorizado!',
    });
  }

  success(res: Response, data?: any): void {
    // log.info('ok');
    res.status(200).json({
      data,
      status: 200,
      message: 'ok',
    });
  }
}

export default ResponseAPI;
