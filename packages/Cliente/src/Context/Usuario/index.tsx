import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import IUsuario from '../../Interfaces/IUsuario';
import { DadosUsuarioRequestAPI } from '../../RequestAPI/Usuario';

interface IUsuarioContext {
  usuario: IUsuario;
  getDadosUsuario: () => void;
  resetDadosUsuario: () => void;
}

const initialValue = {
  id: 0,
  celular: '',
  cpf: '',
  nome: 'Log In',
  senha: '',
};

const UsuarioContext = React.createContext<IUsuarioContext>({
  usuario: initialValue,
  getDadosUsuario: () => null,
  resetDadosUsuario: () => null,
});

const useUsuarioContext: () => IUsuarioContext = () => {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error('useUsuarioContext não funciona sem o UsuarioProvider');
  }

  return context;
};

const UsuarioProvider: React.FC = React.memo(
  ({ children }: { children?: React.ReactNode }) => {
    const [usuario, setUsuario] = useState(initialValue);

    const getDadosUsuario = useCallback(() => {
      const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10);

      async function usuarioDados(): Promise<void> {
        const usuarioRetornado = await DadosUsuarioRequestAPI(idUsuario);
        setUsuario(usuarioRetornado);
      }

      usuarioDados();
    }, []);

    const resetDadosUsuario = useCallback(() => {
      localStorage.setItem('idUsuario', '0');
      localStorage.setItem('funcionario', '');
      localStorage.setItem('token', '');
      setUsuario(initialValue);
    }, []);

    useEffect(() => {
      const idUsuario = localStorage.getItem('idUsuario');
      const funcionario = localStorage.getItem('funcionario');
      const token = localStorage.getItem('token');

      if (!parseInt(idUsuario || '0', 10) && !funcionario?.length && !token?.length) {
        resetDadosUsuario();
      } else {
        getDadosUsuario();
      }
    }, [getDadosUsuario, resetDadosUsuario]);

    const contextValue = useMemo(
      () => ({ usuario, getDadosUsuario, resetDadosUsuario }),
      [usuario, getDadosUsuario, resetDadosUsuario],
    );

    return (
      <UsuarioContext.Provider value={contextValue}>
        {children}
      </UsuarioContext.Provider>
    );
  },
);

UsuarioProvider.defaultProps = {
  children: <div />,
};

export { useUsuarioContext };
export default UsuarioProvider;
