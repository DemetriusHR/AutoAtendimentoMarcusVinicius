import React, { useEffect } from 'react';
import { useUsuarioContext } from '../../Context/Usuario';
import useEnderecoCliente from '../../Hooks/useEnderecoCliente';

interface IPedidoPendenteEndereco {
  idCliente: number;
}

const PedidoPendenteEndereco: React.FC<IPedidoPendenteEndereco> = React.memo(
  ({ idCliente }: IPedidoPendenteEndereco) => {
    const { resetDadosUsuario } = useUsuarioContext();
    const { state, getEnderecos } = useEnderecoCliente();

    useEffect(() => {
      getEnderecos(idCliente, resetDadosUsuario);
    }, [getEnderecos, idCliente, resetDadosUsuario]);
    return (
      <div className="px-4 py-2">
        {state.enderecos.length ? (
          <p className="text-base">
            {`${state.enderecos.length > 1 ? 'Endereços' : 'Endereço'}`}
          </p>
        ) : null}
        {state.enderecos.map((endereco) => (
          <div key={endereco.idendereco} className="flex">
            <div className="flex-1">
              <p>{endereco.endereco}</p>
            </div>
          </div>
        ))}
      </div>
    );
  },
);

export default PedidoPendenteEndereco;
