import { Request, Response } from 'express';

interface IPedidoService {
  listarPendentes: (req: Request, res: Response) => Promise<void>;
  listarPendentesCliente: (req: Request, res: Response) => Promise<void>;
  confirmarEntrega: (req: Request, res: Response) => Promise<void>;
  confirmarDevolucao: (req: Request, res: Response) => Promise<void>;
}

export default IPedidoService;
