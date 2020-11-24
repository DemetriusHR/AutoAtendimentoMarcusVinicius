import IEntranceProduto from '../../entrances/produto';
import IResponseProdutoListar from '../../response/produto/listar';
import IResponseProdutoListarPedido from '../../response/produto/listarPedido';

interface IProdutoRepository {
  listarTodos: () => Promise<IResponseProdutoListar[]>;
  listarEspecifico: (id: number) => Promise<IResponseProdutoListar>;
  listarPedido: (id: number) => Promise<IResponseProdutoListarPedido[]>;
  listarPedidoCliente: (id: number) => Promise<IResponseProdutoListar[]>;
  cadastrar: (produtos: IEntranceProduto[]) => Promise<void>;
}

export default IProdutoRepository;
