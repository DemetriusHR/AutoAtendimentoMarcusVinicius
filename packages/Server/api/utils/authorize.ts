import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import roles from './roles';

interface IDecoded {
  sub: number;
  role: string;
}

function authorize(req: Request, res: Response, next: NextFunction) {
  const idUsuario = parseInt(req.params.id || req.body.id, 10);

  const token = req.headers.authorization.substring(7) || '';

  jwt.verify(
    token,
    `${process.env.SECRET_KEY_JWT}`,
    (err, decoded: IDecoded) => {
      if (idUsuario !== decoded.sub && !roles[decoded.role] && err) {
        return res.status(401).json({
          status: 401,
          message: 'Não Autorizado!',
        });
      } else {
        next();
      }
    }
  );
}

function authorizeFuncionario(req: Request, res: Response, next: NextFunction) {
  const idUsuario = parseInt(req.params.id || req.body.id, 10);

  const token = req.headers.authorization.substring(7) || '';

  jwt.verify(
    token,
    `${process.env.SECRET_KEY_JWT}`,
    (err, decoded: IDecoded) => {
      if (
        idUsuario !== decoded.sub &&
        roles.Funcionario !== decoded.role &&
        err
      ) {
        return res.status(401).json({
          status: 401,
          message: 'Não Autorizado!',
        });
      } else {
        next();
      }
    }
  );
}

export { authorize, authorizeFuncionario };
