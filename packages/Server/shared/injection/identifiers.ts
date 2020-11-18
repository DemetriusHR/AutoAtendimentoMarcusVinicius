export abstract class Identifier {
  // Connect
  public static readonly CONNECT: any = Symbol.for('BDConnect');

  // Routes
  public static readonly ROUTES: any = Symbol.for('Routes');

  // ResponseAPI
  public static readonly RESPONSE_API: any = Symbol.for('ResponseAPI');

  // Repositories
  public static readonly ATENDIMENTO_REPOSITORY: any = Symbol.for('AtendimentoRepository');
  public static readonly HORARIO_REPOSITORY: any = Symbol.for('HorarioRepository');
  public static readonly LOGIN_REPOSITORY: any = Symbol.for('LoginRepository');
  public static readonly PEDIDO_REPOSITORY: any = Symbol.for('PedidoRepository');
  public static readonly PRODUTO_REPOSITORY: any = Symbol.for('ProdutoRepository');
  public static readonly USUARIO_REPOSITORY: any = Symbol.for('UsuarioRepository');

  // Services
  public static readonly ATENDIMENTO_SERVICE: any = Symbol.for('AtendimentoService');
  public static readonly HORARIO_SERVICE: any = Symbol.for('HorarioService');
  public static readonly LOGIN_SERVICE: any = Symbol.for('LoginService');
  public static readonly PEDIDO_SERVICE: any = Symbol.for('PedidoService');
  public static readonly PRODUTO_SERVICE: any = Symbol.for('ProdutoService');
  public static readonly USUARIO_SERVICE: any = Symbol.for('UsuarioService');

  // CONTROLLERS
  public static readonly ACOES_CONTROLLER: any = Symbol.for('AcoesController');
  public static readonly LISTAGEM_CONTROLLER: any = Symbol.for('ListagemController');
  public static readonly API_CONTROLLER: any = Symbol.for('APIController');
}
