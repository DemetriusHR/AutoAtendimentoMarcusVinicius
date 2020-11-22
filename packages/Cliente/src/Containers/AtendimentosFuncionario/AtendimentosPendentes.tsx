import React, { useEffect, useMemo } from 'react';
import moment from 'moment';

import useAtendimentosPendentes from '../../Hooks/useAtendimentosPendentes';
import { useUsuarioContext } from '../../Context/Usuario';

interface IAtendimentosPendentes {
  data: moment.Moment;
}

const AtendimentosPendentes: React.FC<IAtendimentosPendentes> = ({
  data,
}: IAtendimentosPendentes) => {
  const {
    usuario: { id },
    resetDadosUsuario,
  } = useUsuarioContext();
  const { state, getAtendimentosPendentes } = useAtendimentosPendentes();

  useEffect(() => {
    if (id) {
      getAtendimentosPendentes(data, resetDadosUsuario);
    }
  }, [id, getAtendimentosPendentes, data, resetDadosUsuario]);

  const textRetornado = useMemo(() => {
    if (
      state.progress === 'sucess' && state.atendimentosPendentes.length >= 1
    ) {
      if (state.atendimentosPendentes.length > 1) {
        return `${state.atendimentosPendentes.length} atendimentos pendentes`;
      }

      return `${state.atendimentosPendentes.length} atendimento pendente`;
    }
    return 'nenhum atendimento pendente';
  }, [state]);

  return <p className="text-lg py-4">{textRetornado}</p>;
};

export default AtendimentosPendentes;
