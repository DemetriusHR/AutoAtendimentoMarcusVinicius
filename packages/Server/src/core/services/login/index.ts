import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { autoInjectable, inject, singleton } from 'tsyringe';

import roles from '../../../config/utils/roles';
import ILoginRepository from '../../../config/interfaces/repositories/login';
import IResponseAPI from '../../../config/interfaces/response/api';
import ILoginService from '../../../config/interfaces/services/login';
import { Identifier } from '../../../config/injection/identifiers';

@singleton()
@autoInjectable()
class LoginService implements ILoginService {
  private repository: ILoginRepository;
  private response: IResponseAPI;

  constructor(
    @inject(Identifier.LOGIN_REPOSITORY)
    private injectRepository?: ILoginRepository,
    @inject(Identifier.RESPONSE_API)
    private injectResponse?: IResponseAPI
  ) {
    this.repository = injectRepository;
    this.response = injectResponse;
  }

  async cadastrar(req: Request, res: Response): Promise<void> {
    const { nome, cpf, senha, tel, enderecos } = req.body;
    let idUsuario = 0;

    this.repository
      .cadastrar(nome, cpf, senha, tel)
      .then((data) => {
        idUsuario = data.idUsuario;

        this.repository
          .cadastrarEnderecos(idUsuario, enderecos)
          .then(() => {
            this.response.success(res);
          })
          .catch((e) => {
            this.response.errorBadRequest(res, e);
          });
      })
      .catch((e) => {
        this.response.errorBadRequest(res, e);
      });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { cpf, tel, senha } = req.body;

    await this.repository
      .login(cpf, tel, senha)
      .then((dataReturned) => {
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

          const data = {
            loginVerify: dataReturned,
            token,
          };

          this.response.success(res, data);
        } else {
          const erro: Error = Error('Usuário não Existente! Reveja seu Login');

          this.response.errorBadRequest(res, erro);
        }
      })
      .catch((err) => {
        this.response.errorBadRequest(res, err);
      });
  }
}

export default LoginService;
