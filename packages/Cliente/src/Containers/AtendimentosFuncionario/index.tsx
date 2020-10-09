import React from 'react';
import moment from 'moment';

import Card from '../../Components/Card';

moment.locale('pt-br');

const dias = [1, 2, 3, 4, 5, 6];

const AtendimentosContainer: React.FC = () => (
  <div className="flex">
    {dias.map(dia => (
    <Card className="w-24" key={dia}>
      {moment().weekday(dia).day()}
      {moment().weekday(dia).format('DD/MM')}
    </Card>
    ))}
  </div>
);

export default AtendimentosContainer;
