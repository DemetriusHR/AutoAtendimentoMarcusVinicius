import { Request, Response } from 'express';

interface IProdutoService {
  listarTodos: (req: Request, res: Response) => Promise<void>;
  listarEspecifico: (req: Request, res: Response) => Promise<void>;
  listarPedido: (req: Request, res: Response) => Promise<void>;
  listarPedidoCliente: (req: Request, res: Response) => Promise<void>;
}

export default IProdutoService;
