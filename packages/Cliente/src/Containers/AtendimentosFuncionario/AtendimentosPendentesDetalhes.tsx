import React, { useEffect } from 'react';
import styled from 'styled-components';
import AntDivider from 'antd/lib/divider';
import Collapse from 'antd/lib/collapse';

import useAtendimentosPendentes from '../../Hooks/useAtendimentosPendentesDetalhes';
import IHorarios from '../../Interfaces/IHorarios';

const TextNotFound = styled.span`
  color: var(--text-not-found-color);
`;

const DivWidth = styled.div`
  width: 10rem;
`;

const Divider = styled(AntDivider)`
  width: 10rem;
  min-width: 0;
`;

const AtendimentosPendentesDetalhes: React.FC<IHorarios> = ({
  data,
  horarioInicial,
  horarioFinal,
  key,
}: IHorarios) => {
  const { state, getAtendimentosPendentes } = useAtendimentosPendentes();

  useEffect(() => {
    getAtendimentosPendentes(data);
  }, [getAtendimentosPendentes, data]);

  if (state.progress === 'sucess' && state.atendimentosPendentes) {
    return (
      <Collapse.Panel
        key={key}
        header={(
          <div className="flex container items-center">
            <div className="w-24 text-2xl">
              <span className="pr-4">{horarioInicial}</span>
            </div>
            <Divider />
            <DivWidth className="text-2xl">
              <span className="pl-4">{horarioFinal}</span>
            </DivWidth>
            <DivWidth className="ml-4">
              <p className="m-0">Cliente</p>
              <TextNotFound>
                {state.atendimentosPendentes.nomeCliente}
              </TextNotFound>
            </DivWidth>
          </div>
        )}
        className="pedido-collapse-panel"
      >
        <p>dale</p>
      </Collapse.Panel>
    );
  }

  return null;
};

export default AtendimentosPendentesDetalhes;
