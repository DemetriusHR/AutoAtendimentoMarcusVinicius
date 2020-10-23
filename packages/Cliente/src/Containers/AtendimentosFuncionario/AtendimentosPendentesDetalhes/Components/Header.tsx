import React from 'react';
import styled from 'styled-components';
import AntDivider from 'antd/lib/divider';

import IHorarios from '../../../../Interfaces/IHorarios';

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

interface IAtendimentosPendentesHeader {
  horario: IHorarios;
  cliente: string;
}

const AtendimentosPendentesHeader: React.FC<IAtendimentosPendentesHeader> = ({
  horario,
  cliente,
}: IAtendimentosPendentesHeader) => (
  <div className="flex container items-center">
    <div className="w-24 text-2xl">
      <span className="pr-4">{horario.horarioInicial}</span>
    </div>
    <Divider />
    <DivWidth className="text-2xl">
      <span className="pl-4">{horario.horarioFinal}</span>
    </DivWidth>
    <DivWidth className="ml-4">
      <p className="m-0">Cliente</p>
      <TextNotFound>{cliente}</TextNotFound>
    </DivWidth>
  </div>
);

export default AtendimentosPendentesHeader;
