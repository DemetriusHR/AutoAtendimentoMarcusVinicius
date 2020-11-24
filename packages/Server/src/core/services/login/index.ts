import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import roles from '../../../config/utils/roles';
import ILoginRepository from '../../../config/interfaces/repositories/login';
import IResponseAPI from '../../../config/interfaces/response/api';
import ILoginService from '../../../config/interfaces/services/login';
import IEntranceEndereco from '../../../config/interfaces/entrances/endereco';
import IResponseLogin from '../../../config/interfaces/response/login/login';
import LoginRepository from '../../repositories/login';
import ResponseAPI from '../../response';

interface IDataLogin {
  loginVerify: IResponseLogin;
  token: string;
}

const repository: ILoginRepository = new LoginRepository();
const response: IResponseAPI = new ResponseAPI();

class LoginService implements ILoginService {
  async cadastrar(req: Request, res: Response): Promise<void> {
    const nome: string = req.body.nome;
    const cpf: string = req.body.cpf;
    const senha: string = req.body.senha;
    const tel: string = req.body.tel;
    const enderecos: IEntranceEndereco[] = req.body.enderecos;

    let idUsuario: number = 0;

    repository
      .cadastrar(nome, cpf, senha, tel)
      .then((data) => {
        idUsuario = data.idUsuario;

        repository
          .cadastrarEnderecos(idUsuario, enderecos)
          .then(() => {
            response.success(res);
          })
          .catch((e) => {
            response.errorBadRequest(res, e);
          });
      })
      .catch((e) => {
        response.errorBadRequest(res, e);
      });
  }

  async login(req: Request, res: Response): Promise<void> {
    console.log('service', req.body, this);
    const cpf: string = req.body.cpf;
    const senha: string = req.body.senha;
    const tel: string = req.body.tel;

    try {
      const dataReturned: IResponseLogin = await repository.login(
        senha,
        cpf,
        tel
      );

      console.log(dataReturned);

      if (dataReturned.idUsuario) {
        const token: string = jwt.sign(
          {
            sub: dataReturned.idUsuario,
            role: dataReturned.funcionario ? roles.Employee : roles.User,
          },
          `${process.env.SECRET_KEY_JWT}`,
          {
            expiresIn: '7d',
          }
        );

        const data: IDataLogin = {
          token,
          loginVerify: dataReturned,
        };

        console.log('sucess', data);

        response.success(res, data);
      } else {
        Error('Usuário não Existente! Reveja seu Login');
      }
    } catch (err) {
      response.errorBadRequest(res, err);
    }
  }
}

export default LoginService;
