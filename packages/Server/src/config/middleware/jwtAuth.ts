import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import env from '../env';
import roles from '../utils/roles';

interface IDecoded {
  sub: number;
  role: string;
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const idUser: number = parseInt(req.params.id || req.body.id, 10);
  const token: string = (req.headers['Authorization'] || '')
    .toString()
    .substring(7);

  if (token) {
    try {
      jwt.verify(
        token,
        env.secret,
        (err: jwt.VerifyErrors, decoded: IDecoded) => {
          if (
            idUser !== decoded.sub ||
            !(decoded.role === roles.Employee || decoded.role === roles.User) ||
            err
          ) {
            res.status(401).json({
              status: 401,
              message: 'Não Autorizado!',
            });
          }

          next();
        }
      );

      return next();
    } catch (error) {
      res.status(401).json({
        status: 401,
        message: 'Não Autorizado!',
      });
    }
  }

  res.status(401).json({
    status: 401,
    message: 'Não há Token!',
  });
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuthUser:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */
export function isAuthenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const idUser: number = parseInt(req.params.id || req.body.id, 10);
  const token: string = (req.headers['Authorization'] || '')
    .toString()
    .substring(7);

  if (token) {
    try {
      jwt.verify(
        token,
        env.secret,
        (err: jwt.VerifyErrors, decoded: IDecoded) => {
          if (idUser !== decoded.sub || decoded.role !== roles.User || err) {
            res.status(401).json({
              status: 401,
              message: 'Não Autorizado!',
            });
          }

          next();
        }
      );

      return next();
    } catch (error) {
      res.status(401).json({
        status: 401,
        message: 'Não Autorizado!',
      });
    }
  }

  res.status(401).json({
    status: 401,
    message: 'Não há Token!',
  });
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuthEmployee:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */
export function isAuthenticatedEmployee(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const idUser: number = parseInt(req.params.id || req.body.id, 10);
  const token: string = (req.headers['Authorization'] || '')
    .toString()
    .substring(7);

  if (token) {
    try {
      jwt.verify(
        token,
        env.secret,
        (err: jwt.VerifyErrors, decoded: IDecoded) => {
          if (
            idUser !== decoded.sub ||
            decoded.role !== roles.Employee ||
            err
          ) {
            res.status(401).json({
              status: 401,
              message: 'Não Autorizado!',
            });
          }

          next();
        }
      );

      return next();
    } catch (error) {
      res.status(401).json({
        status: 401,
        message: 'Não Autorizado!',
      });
    }
  }

  res.status(401).json({
    status: 401,
    message: 'Não há Token!',
  });
}
