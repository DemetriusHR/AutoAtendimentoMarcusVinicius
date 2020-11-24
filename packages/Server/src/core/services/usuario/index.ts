import { Request, Response } from 'express';

import IUsuarioRepository from '../../../config/interfaces/repositories/usuario';
import IResponseAPI from '../../../config/interfaces/response/api';
import IUsuarioService from '../../../config/interfaces/services/usuario';
import UsuarioRepository from '../../repositories/usuario';
import ResponseAPI from '../../response';

const repository: IUsuarioRepository = new UsuarioRepository();
const response: IResponseAPI = new ResponseAPI();

class UsuarioService implements IUsuarioService {
  public async editar(req: Request, res: Response): Promise<void> {
    const id: number = req.body.id;
    const nome: string = req.body.nome;
    const cpf: string = req.body.cpf;
    const senha: string = req.body.senha;
    const celular: string = req.body.celular;

    repository
      .editar(id, nome, cpf, celular, senha)
      .then(() => {
        response.success(res);
      })
      .catch((err) => {
        response.error(res, err);
      });
  }

  public async listarEnderecos(req: Request, res: Response): Promise<void> {
    const idUsuario: number = parseInt(req.params.id, 10);

    repository
      .listarEnderecos(idUsuario)
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.success(res, err);
      });
  }

  public async listarInformacoes(req: Request, res: Response): Promise<void> {
    const idUsuario: number = parseInt(req.params.id, 10);

    repository
      .listarInformacoes(idUsuario)
      .then((data) => {
        response.success(res, data);
      })
      .catch((err) => {
        response.success(res, err);
      });
  }
}

export default UsuarioService;
