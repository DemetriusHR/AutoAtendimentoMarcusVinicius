import { IEndereco } from '..';

function comparaEndereco(prevState: IEndereco[], novoEndereco: IEndereco): boolean {
  let retornoComparacao = true;

  prevState.forEach((endereco) => {
    if (
      endereco.rua_endereco_usuario === novoEndereco.rua_endereco_usuario
      && endereco.no_endereco_usuario === novoEndereco.no_endereco_usuario
      && endereco.complemento_endereco_usuario === novoEndereco.complemento_endereco_usuario
      && endereco.cep_endereco_usuario === novoEndereco.cep_endereco_usuario
      && endereco.cidade_endereco_usuario === novoEndereco.cidade_endereco_usuario
    ) {
      retornoComparacao = false;
    }
  });

  return retornoComparacao;
}

export default comparaEndereco;
