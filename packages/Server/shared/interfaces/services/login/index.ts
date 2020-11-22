import { Request, Response } from 'express';

interface ILoginService {
  login: (req: Request, res: Response) => Promise<void>;
  cadastrar: (req: Request, res: Response) => Promise<void>;
}

export default ILoginService;
