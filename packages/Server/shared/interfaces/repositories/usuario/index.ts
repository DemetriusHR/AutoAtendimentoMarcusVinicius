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
