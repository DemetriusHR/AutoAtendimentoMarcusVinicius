import * as format from 'pg-format';
import { autoInjectable, inject, singleton } from 'tsyringe';

import { Identifier } from '../../../config/injection/identifiers';
import IBDConnect from '../../../config/bdConnect/interface';
import IEntranceProduto from '../../../config/interfaces/entrances/produto';
import IProdutoRepository from '../../../config/interfaces/repositories/produto';
import IResponseProdutoListar from '../../../config/interfaces/response/produto/listar';
import IResponseProdutoListarPedido from '../../../config/interfaces/response/produto/listarPedido';

@singleton()
@autoInjectable()
class ProdutoRepository implements IProdutoRepository {
  private bdConnect: IBDConnect;

  constructor(
    @inject(Identifier.CONNECT)
    private poolConnect?: IBDConnect
  ) {
    this.bdConnect = poolConnect;
  }

  public async cadastrar(produtos: IEntranceProduto[]): Promise<void> {
    const produtosMapeados: (string | number)[][] = produtos.map((produto) => {
      return [produto.idAtendimento, produto.idProduto, produto.descricao];
    });

    const bdConnect: IBDConnect = this.bdConnect;
    const query: string = format(
      `INSERT INTO PedidosProdutos(ID_Atendimento, ID_Produto, DES_Pedido_Pedido)
       VALUES %L`,
      produtosMapeados
    );

    return await bdConnect.connectWithinData(query, []);
  }

  public async listarEspecifico(id: number): Promise<IResponseProdutoListar> {
    const query: string = `SELECT id_produto                                                as idproduto
                        ,concat(nm_produto, ' - ', cor_produto, ' - ', no_produto) as nmproduto
                    FROM produto
                    WHERE id_produto = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithData<IResponseProdutoListar>(
      query,
      variables
    );
  }

  public async listarPedido(
    id: number
  ): Promise<IResponseProdutoListarPedido[]> {
    const query: string = `SELECT Produto.ID_Produto                                                                 AS idProduto
                                 ,concat(Produto.nm_produto, ' - ', Produto.cor_produto, ' - ', Produto.no_produto)  AS nmProduto
                                 ,PedidosProdutos.DES_Pedido_Pedido                                                  AS descricao
                           FROM PedidosProdutos
                             INNER JOIN Produto
                             ON Produto.ID_Produto = PedidosProdutos.ID_Produto
                           WHERE PedidosProdutos.ID_Atendimento = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithDatas<IResponseProdutoListarPedido>(
      query,
      variables
    );
  }

  public async listarPedidoCliente(
    id: number
  ): Promise<IResponseProdutoListar[]> {
    const query: string = `SELECT Produto.ID_Produto                                    AS idProduto
                                 ,concat(Produto.NM_Produto, ' - ', Produto.NO_Produto) AS nmProduto
                           FROM PedidosProdutos
                             INNER JOIN Produto
                             ON Produto.ID_Produto = PedidosProdutos.ID_Produto
                           WHERE PedidosProdutos.ID_Atendimento = $1`;
    const variables: number[] = [id];
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithDatas<IResponseProdutoListar>(
      query,
      variables
    );
  }

  public async listarTodos(): Promise<IResponseProdutoListar[]> {
    const query: string = `SELECT id_produto                                                as idproduto
                                 ,concat(nm_produto, ' - ', cor_produto, ' - ', no_produto) as nmproduto
                           FROM produto`;
    const bdConnect: IBDConnect = this.bdConnect;

    return await bdConnect.connectWithDatas<IResponseProdutoListar>(query, []);
  }
}

export default ProdutoRepository;
