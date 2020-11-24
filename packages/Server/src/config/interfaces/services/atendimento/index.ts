import { Request, Response } from 'express';

interface IAtendimentoService {
  verificar: (req: Request, res: Response) => Promise<void>;
  cancelar: (req: Request, res: Response) => Promise<void>;
  confirmar: (req: Request, res: Response) => Promise<void>;
}

export default IAtendimentoService;
