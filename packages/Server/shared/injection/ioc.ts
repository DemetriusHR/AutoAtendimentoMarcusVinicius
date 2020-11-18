import express from 'express';
import { container } from 'tsyringe';

import APIController from 'api';
import AcoesController from 'api/controllers/acoes';
import ListagemController from 'api/controllers/listagem';
import pool from 'core/connection';
import AtendimentoRepository from 'core/repositories/atendimento';
import HorarioRepository from 'core/repositories/horario';
import LoginRepository from 'core/repositories/login';
import PedidoRepository from 'core/repositories/pedido';
import ProdutoRepository from 'core/repositories/produto';
import UsuarioRepository from 'core/repositories/usuario';
import ResponseAPI from 'core/response';
import AtendimentoService from 'core/services/atendimento';
import HorarioService from 'core/services/horario';
import LoginService from 'core/services/login';
import PedidoService from 'core/services/pedido';
import ProdutoService from 'core/services/produto';
import UsuarioService from 'core/services/usuario';
import BDConnect from 'shared/interfaces/bdConnect';
import { Identifier } from './identifiers';

async function registeringDependencies() {
  // Connect
  await container.register(Identifier.CONNECT, {
    useValue: new BDConnect(pool),
  });

  // Routes
  await container.register(Identifier.ROUTES, {
    useValue: express.Router(),
  });

  // ResponseAPI
  await container.register(Identifier.RESPONSE_API, {
    useValue: ResponseAPI,
  });

  // Repositories
  await container.register(Identifier.ATENDIMENTO_REPOSITORY, {
    useClass: AtendimentoRepository,
  });
  await container.register(Identifier.LOGIN_REPOSITORY, {
    useClass: LoginRepository,
  });
  await container.register(Identifier.HORARIO_REPOSITORY, {
    useClass: HorarioRepository,
  });
  await container.register(Identifier.PEDIDO_REPOSITORY, {
    useClass: PedidoRepository,
  });
  await container.register(Identifier.PRODUTO_REPOSITORY, {
    useClass: ProdutoRepository,
  });
  await container.register(Identifier.USUARIO_REPOSITORY, {
    useClass: UsuarioRepository,
  });

  // Services
  await container.register(Identifier.ATENDIMENTO_SERVICE, {
    useClass: AtendimentoService,
  });
  await container.register(Identifier.LOGIN_SERVICE, {
    useClass: LoginService,
  });
  await container.register(Identifier.HORARIO_SERVICE, {
    useClass: HorarioService,
  });
  await container.register(Identifier.PEDIDO_SERVICE, {
    useClass: PedidoService,
  });
  await container.register(Identifier.PRODUTO_SERVICE, {
    useClass: ProdutoService,
  });
  await container.register(Identifier.USUARIO_SERVICE, {
    useClass: UsuarioService,
  });

  // Controllers
  await container.register(Identifier.ACOES_CONTROLLER, {
    useClass: AcoesController,
  });
  await container.register(Identifier.LISTAGEM_CONTROLLER, {
    useClass: ListagemController,
  });
  await container.register(Identifier.API_CONTROLLER, {
    useClass: APIController,
  });
}

export default registeringDependencies;
