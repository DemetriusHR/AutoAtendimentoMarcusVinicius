import { Request, Response } from 'express';

interface IHorarioService {
  verificar: (req: Request, res: Response) => Promise<void>;
  marcar: (req: Request, res: Response) => Promise<void>;
}

export default IHorarioService;
