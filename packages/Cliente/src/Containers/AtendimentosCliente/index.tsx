import React from 'react';
import Calendar from 'antd/lib/calendar';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';

import Card from '../../Components/Card';

const AtendimentosClienteContainer: React.FC = () => (
  <Card className="p-4">
    <p className="text-lg">
      Mês:{' '}
      {moment().month(moment().month()).format("MMMM")}
    </p>
    <Calendar
      locale={
        locale
      }
      headerRender={() =>
        null
      }
      validRange={[
        moment().startOf(
          'month'
        ),
        moment().endOf(
          'month'
        ),
      ]}
    />
  </Card>
);

export default AtendimentosClienteContainer;
