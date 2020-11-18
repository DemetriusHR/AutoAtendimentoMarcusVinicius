import IResponseUsuarioListarEndereco from 'shared/interfaces/response/usuario/listarendereco';
import IResponseUsuarioListarInformacoes from 'shared/interfaces/response/usuario/listarinformacoes';

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
