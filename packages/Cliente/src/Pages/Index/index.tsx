import React, { useEffect } from 'react';

import useVerificaUsuario from '../../Hooks/useVerificaUsuario';
import FuncionariosPage from '../Funcionarios';
import ClientesPage from '../Clientes';
import { useUsuarioContext } from '../../Context/Usuario';

const IndexPage: React.FC = React.memo(() => {
  const {
    usuario: { id },
  } = useUsuarioContext();
  const { state, getVerificacaoUsuario } = useVerificaUsuario();

  useEffect(() => {
    if (id) {
      getVerificacaoUsuario();
    } else {
      getVerificacaoUsuario();
    }
  }, [id, getVerificacaoUsuario]);

  if (state.usuario.funcionario) {
    return <FuncionariosPage />;
  }

  return <ClientesPage />;
});

export default IndexPage;
