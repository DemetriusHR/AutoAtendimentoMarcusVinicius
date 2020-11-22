import { Request, Response, Router } from 'express';
import { authorize, authorizeFuncionario } from './authorize';

function rotasAutorizadasGet(
  router: Router,
  rota: string,
  funcao: (req: Request, res: Response) => Promise<void>
) {
  router.route(rota).get(authorize, funcao);
}

function rotasAutorizadasPost(
  router: Router,
  rota: string,
  validate,
  funcao: (req: Request, res: Response) => Promise<void>
) {
  router.route(rota).post(validate, authorize, funcao);
}

function rotasAutorizadasDelete(
  router: Router,
  rota: string,
  validate,
  funcao: (req: Request, res: Response) => Promise<void>
) {
  router.route(rota).delete(validate, authorize, funcao);
}

function rotasAutorizadasEditar(
  router: Router,
  rota: string,
  validate,
  funcao: (req: Request, res: Response) => Promise<void>
) {
  router.route(rota).put(validate, authorize, funcao);
}

function rotasAutorizadasGetFuncionario(
  router: Router,
  rota: string,
  funcao: (req: Request, res: Response) => Promise<void>
) {
  router.route(rota).get(authorizeFuncionario, funcao);
}

function rotasAutorizadasPostFuncionario(
  router: Router,
  rota: string,
  validate,
  funcao: (req: Request, res: Response) => Promise<void>
) {
  router.route(rota).post(validate, authorizeFuncionario, funcao);
}

function rotasAutorizadasDeleteFuncionario(
  router: Router,
  rota: string,
  validate,
  funcao: (req: Request, res: Response) => Promise<void>
) {
  router.route(rota).delete(validate, authorizeFuncionario, funcao);
}

export {
  rotasAutorizadasGet,
  rotasAutorizadasPost,
  rotasAutorizadasDelete,
  rotasAutorizadasEditar,
  rotasAutorizadasGetFuncionario,
  rotasAutorizadasPostFuncionario,
  rotasAutorizadasDeleteFuncionario,
};
