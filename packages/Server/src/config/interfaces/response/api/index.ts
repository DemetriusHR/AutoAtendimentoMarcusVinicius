import { Response } from 'express';

interface IResponseAPI {
  success: (res: Response, data?: any) => void;
  error: (res: Response, error: Error) => void;
  errorBadRequest: (res: Response, error: Error) => void;
  errorUnauthorized: (res: Response) => void;
}

export default IResponseAPI;
