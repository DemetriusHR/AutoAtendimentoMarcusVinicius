import React, {
  useEffect,
  useMemo,
} from 'react';
import Modal from 'antd/lib/modal';
import moment from 'moment';

import HorarioContainer from '../../Horario';
import { horariosDiaNormal, horariosDiaSabado } from '../../../Utils/HorariosAtendimento';

interface IAtendimentoComponent {
  data: moment.Moment;
  visible: boolean;
  onCancel: () => void;
}

const AtendimentoComponent: React.FC<IAtendimentoComponent> = React.memo(({
  data,
  visible,
  onCancel,
}: IAtendimentoComponent) => {
  const dataAtendimento: string = useMemo(() => `Atendimentos do Dia ${data.format('DD/MM')}`, [data]);

  const dataSemana = useMemo(() => data.weekday(), [data]);

  const arrayHorarios = useMemo(() => {
    if (data.weekday() === 6) {
      return horariosDiaNormal(data);
    }

    return horariosDiaSabado(data);
  }, [data]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [visible]);

  return dataSemana ? (
    <Modal
      title={dataAtendimento}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      {arrayHorarios.map((horario) => <HorarioContainer {...horario} onCancel={onCancel} />)}
    </Modal>
  ) : null;
});

export default AtendimentoComponent;
