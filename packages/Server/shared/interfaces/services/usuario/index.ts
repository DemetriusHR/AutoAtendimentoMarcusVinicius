import { Request, Response } from 'express';

interface IUsuarioService {
  listarInformacoes: (req: Request, res: Response) => Promise<void>;
  listarEnderecos: (req: Request, res: Response) => Promise<void>;
  editar: (req: Request, res: Response) => Promise<void>;
}

export default IUsuarioService;
