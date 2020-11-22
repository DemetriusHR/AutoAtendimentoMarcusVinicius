import React, { useEffect } from 'react';
import { useUsuarioContext } from '../../Context/Usuario';
import useEnderecoCliente from '../../Hooks/useEnderecoCliente';

interface IPedidoPendenteEndereco {
  idCliente: number;
}

const PedidoPendenteEndereco: React.FC<IPedidoPendenteEndereco> = React.memo(
  ({ idCliente }: IPedidoPendenteEndereco) => {
    const {
      usuario: { id },
      resetDadosUsuario,
    } = useUsuarioContext();
    const { state, getEnderecos } = useEnderecoCliente();

    useEffect(() => {
      if (id) {
        getEnderecos(idCliente, resetDadosUsuario);
      }
    }, [getEnderecos, id, idCliente, resetDadosUsuario]);
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
              <p>{`${endereco.rua}, nº ${endereco.numero} - ${endereco.cidade}`}</p>
            </div>
          </div>
        ))}
      </div>
    );
  },
);

export default PedidoPendenteEndereco;
