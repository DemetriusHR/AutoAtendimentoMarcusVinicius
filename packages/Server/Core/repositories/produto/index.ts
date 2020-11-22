import format from 'pg-format';
import { Identifier } from 'shared/injection/identifiers';
import IBDConnect from 'shared/interfaces/bdConnect/interface';
import IEntranceProduto from 'shared/interfaces/entrances/produto';
import IProdutoRepository from 'shared/interfaces/repositories/produto';
import IResponseProdutoListar from 'shared/interfaces/response/produto/listar';
import IResponseProdutoListarPedido from 'shared/interfaces/response/produto/listarPedido';
import { autoInjectable, inject, singleton } from 'tsyringe';

@singleton()
@autoInjectable()
class ProdutoRepository implements IProdutoRepository {
  private bdConnect: IBDConnect;

  constructor(
    @inject(Identifier.CONNECT)
    private poolConnect?: IBDConnect,
  ) {
    this.bdConnect = poolConnect;
  }

  public async cadastrar(produtos: IEntranceProduto[]): Promise<void> {
    const produtosMapeados = produtos.map((produto) => {
      return [produto.idAtendimento, produto.idProduto, produto.descricao];
    });
    const bdConnect = this.bdConnect;
    const query = format(
      `INSERT INTO PedidosProdutos(ID_Atendimento, ID_Produto, DES_Pedido_Pedido)
       VALUES %L`,
      produtosMapeados
    );

    return new Promise(async (resolve, reject) => {
      await bdConnect.connectWithinData(query, null, reject);
      resolve(null);
    });
  }

  public async listarEspecifico(id: number): Promise<IResponseProdutoListar> {
    const query = `SELECT id_produto                                                as idproduto
                        ,concat(nm_produto, ' - ', cor_produto, ' - ', no_produto) as nmproduto
                    FROM produto
                    WHERE id_produto = $1`;
    const variables = [id];
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(await bdConnect.connectWithData<IResponseProdutoListar>(query, variables, reject));
    });
  }

  public async listarPedido(id: number): Promise<IResponseProdutoListarPedido[]> {
    const query = `SELECT Produto.ID_Produto                                                                 AS idProduto
                         ,concat(Produto.nm_produto, ' - ', Produto.cor_produto, ' - ', Produto.no_produto)  AS nmProduto
                         ,PedidosProdutos.DES_Pedido_Pedido                                                  AS descricao
                   FROM PedidosProdutos
                     INNER JOIN Produto
                     ON Produto.ID_Produto = PedidosProdutos.ID_Produto
                   WHERE PedidosProdutos.ID_Atendimento = $1`;
    const variables = [id];
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(await bdConnect.connectWithDatas<IResponseProdutoListarPedido>(query, variables, reject));
    });
  }

  public async listarPedidoCliente(id: number): Promise<IResponseProdutoListar[]> {
    const query = `SELECT Produto.ID_Produto                                    AS idProduto
                         ,concat(Produto.NM_Produto, ' - ', Produto.NO_Produto) AS nmProduto
                   FROM PedidosProdutos
                     INNER JOIN Produto
                     ON Produto.ID_Produto = PedidosProdutos.ID_Produto
                   WHERE PedidosProdutos.ID_Atendimento = $1`;
    const variables = [id];
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(await bdConnect.connectWithDatas<IResponseProdutoListar>(query, variables, reject));
    });
  }

  public async listarTodos(): Promise<IResponseProdutoListar[]> {
    const query = `SELECT id_produto                                                as idproduto
                         ,concat(nm_produto, ' - ', cor_produto, ' - ', no_produto) as nmproduto
                   FROM produto`;
    const bdConnect = this.bdConnect;

    return new Promise(async (resolve, reject) => {
      resolve(await bdConnect.connectWithDatas<IResponseProdutoListar>(query, null, reject));
    });
  }
}

export default ProdutoRepository;