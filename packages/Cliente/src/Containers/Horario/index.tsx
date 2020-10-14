import React, {
  useCallback,
  useEffect,
} from 'react';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
import Notification from 'antd/lib/notification';

import IHorarios from '../../Interfaces/IHorarios';
import useVerificaAtendimento from '../../Hooks/useVerificaAtendimento';
import ButtonConfirm from '../../Components/ButtonConfirm';
import useVerificaHorario from '../../Hooks/useVerificaHorario';
import { theme } from '../../Utils/Theme';
import { useModaisContext } from '../../Context/Modais';

const TextNotFound = styled.span`
  color: var(
    --text-not-found-color
  );
`;

const DivWidth = styled.div`
  width: 10rem;
`;

interface IButtonCadastre {
  onClick: () => void
}

const ButtonCadastre: React.FC<IButtonCadastre> = React.memo(
  ({ onClick }: IButtonCadastre) => (
    <div>
      <ButtonConfirm
        theme={theme}
        onClick={onClick}
      >
        Cadastre-se agora
      </ButtonConfirm>
    </div>
  ),
);

interface IHorariosContainer extends IHorarios {
  onCancel: () => void
}

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
      state: stateHorario,
      getVerificacaoHorario,
    } = useVerificaHorario();
    const { onModalLoginVisible } = useModaisContext();

    useEffect(() => {
      getVerificacao(
        data,
      );
      getVerificacaoHorario(
        data,
      );
    }, [
      data,
      getVerificacao,
      getVerificacaoHorario,
    ]);

    const onClickButtonCadastre = useCallback(() => {
      onCancel();
      onModalLoginVisible();
    }, [onCancel, onModalLoginVisible]);

    const onClickButton = useCallback(() => {
      if (stateHorario.horario && stateHorario.progress === 'sucess') {
        Notification.success({
          message: 'Atendimento Agendado',
        });
      } else {
        Notification.warning({
          message: 'Você não está logado!',
          description: <ButtonCadastre onClick={onClickButtonCadastre} />,
        });
      }
    }, [stateHorario, onClickButtonCadastre]);

    return (
      <div className="flex container border py-2 px-4 my-4 items-center">
        <DivWidth className="text-2xl">
          <span className="pr-4">
            {
              horarioInicial
            }
          </span>
        </DivWidth>
        <Divider className="w-40 min-w-0" />
        <DivWidth className="text-2xl">
          <span className="pl-4">
            {
              horarioFinal
            }
          </span>
        </DivWidth>
        <DivWidth className="ml-4">
          {stateAtendimento.atendimento ? (
            <TextNotFound>
              Já
              Agendado
            </TextNotFound>
          ) : (
            <ButtonConfirm onClick={onClickButton}>
              Marcar
              Horário
            </ButtonConfirm>
          )}
        </DivWidth>
      </div>
    );
  },
);

export default HorarioContainer;
