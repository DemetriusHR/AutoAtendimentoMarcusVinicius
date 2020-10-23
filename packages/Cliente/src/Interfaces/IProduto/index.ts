/* eslint semi: ["error", "never"] */

import IProdutoList from '../IProdutoList'

export default interface IProduto extends IProdutoList {
  detalhesProduto: string;
}
