import React, { useCallback, useState } from 'react';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';

import Card from '../../Components/Card';
import Calendar from '../../Components/Calendar';
import capitalizeFirstLetter from '../../Utils/CapitalizeFirstLetter';
import AtendimentoComponent from './Components/Atendimento';

const mesAtual = `Mês: ${capitalizeFirstLetter(moment().month(moment().month()).format('MMMM'))}`;

const range: [moment.Moment, moment.Moment] = [
  moment().startOf(
    'month',
  ),
  moment().endOf(
    'month',
  ),
];

function functionSemRetorno(): React.ReactNode {
  return null;
}

const AtendimentosClienteContainer: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(moment);

  const onVisibleModal = useCallback((data: moment.Moment) => {
    setModal(true);
    setDate(data);
  }, []);

  const onUnVisibleModal = useCallback(() => {
    setModal(false);
    setDate(moment);
  }, []);

  return (
    <Card className="p-4">
      <p className="text-lg">
        {mesAtual}
      </p>
      <Calendar
        locale={
          locale
        }
        headerRender={functionSemRetorno}
        validRange={range}
        onSelect={onVisibleModal}
      />
      <AtendimentoComponent
        data={date}
        visible={modal}
        onCancel={onUnVisibleModal}
      />
    </Card>
  );
};

export default AtendimentosClienteContainer;
