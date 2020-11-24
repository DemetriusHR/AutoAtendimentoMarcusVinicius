import IResponseUsuarioListarEndereco from '../../response/usuario/listarendereco';
import IResponseUsuarioListarInformacoes from '../../response/usuario/listarinformacoes';

interface IUsuarioRepository {
  listarInformacoes: (id: number) => Promise<IResponseUsuarioListarInformacoes>;
  listarEnderecos: (id: number) => Promise<IResponseUsuarioListarEndereco[]>;
  editar: (
    id: number,
    nome: string,
    cpf: string,
    celular: string,
    senha: string
  ) => Promise<void>;
}

export default IUsuarioRepository;
