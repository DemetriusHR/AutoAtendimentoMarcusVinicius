import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import AntDivider from 'antd/lib/divider';

import IHorarios from '../../Interfaces/IHorarios';
import useVerificaAtendimento from '../../Hooks/useVerificaAtendimento';
import ButtonConfirm from '../../Components/ButtonConfirm';
import { useModaisContext } from '../../Context/Modais';
import { useUsuarioContext } from '../../Context/Usuario';
import { MarcarHorarioRequestAPI } from '../../RequestAPI/Horario';

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

interface IHorariosContainer extends IHorarios {
  onCancel: () => void;
}

interface IRetornaButtonHorario {
  atendimento: boolean;
  onClickButton: () => void;
}

const RetornaButtonHorario: React.FC<IRetornaButtonHorario> = React.memo(
  ({ atendimento, onClickButton }: IRetornaButtonHorario) => {
    if (atendimento) {
      return <TextNotFound>Já Agendado</TextNotFound>;
    }

    return (
      <ButtonConfirm onClick={onClickButton}>Marcar Horário</ButtonConfirm>
    );
  },
);

const HorarioContainer: React.FC<IHorariosContainer> = React.memo(
  ({
    data,
    horarioInicial,
    horarioFinal,
    onCancel,
  }: IHorariosContainer) => {
    const {
      state: stateAtendimento,
      getVerificacao,
    } = useVerificaAtendimento();
    const {
      usuario: { id },
      resetDadosUsuario,
    } = useUsuarioContext();
    const { onModalLoginVisible } = useModaisContext();

    const verificaData = useCallback(() => {
      getVerificacao(data);
    }, [data, getVerificacao]);

    useEffect(() => {
      verificaData();
    }, [verificaData]);

    const onClickButtonLogin = useCallback(() => {
      onCancel();
      onModalLoginVisible();
      resetDadosUsuario();
    }, [onCancel, onModalLoginVisible, resetDadosUsuario]);

    const onClickButton = useCallback(() => {
      MarcarHorarioRequestAPI(
        data.format('YYYY-MM-DD h:mm'),
        id,
        onClickButtonLogin,
        verificaData,
      );
    }, [data, id, onClickButtonLogin, verificaData]);

    return (
      <div className="flex container border py-2 px-4 my-4 items-center">
        <div className="w-24 text-2xl">
          <span className="pr-4">{horarioInicial}</span>
        </div>
        <Divider />
        <DivWidth className="text-2xl">
          <span className="pl-4">{horarioFinal}</span>
        </DivWidth>
        <DivWidth className="ml-4">
          <RetornaButtonHorario
            {...stateAtendimento}
            onClickButton={onClickButton}
          />
        </DivWidth>
      </div>
    );
  },
);

export default HorarioContainer;
