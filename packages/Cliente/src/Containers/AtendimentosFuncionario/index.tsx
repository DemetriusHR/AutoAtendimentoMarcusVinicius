import React, { useCallback, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import Card from '../../Components/Card';
import capitalizeFirstLetter from '../../Utils/CapitalizeFirstLetter';
import AtendimentoComponent from './Components/Atendimento';
import AtendimentosPendentes from './AtendimentosPendentes';

moment.locale('pt-br');

const dias = [1, 2, 3, 4, 5, 6];

const CardsWrapper = styled.div`
  > div {
    margin-right: 1rem;

    :last-child {
      margin-right: 0;
    }
  }
`;

const AtendimentosContainer: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(moment);

  const onVisibleModal = useCallback(
    (dia) => () => {
      setModal(true);
      setDate(dia);
    },
    [],
  );

  const onUnVisibleModal = useCallback(() => {
    setModal(false);
    setDate(moment);
  }, []);

  return (
    <CardsWrapper className="flex">
      {dias.map((dia) => (
        <Card
          className="flex-1 p-2 text-center cursor-pointer"
          key={dia}
          onClick={onVisibleModal(moment().weekday(dia))}
        >
          <h1 className="text-lg">
            {capitalizeFirstLetter(moment().weekday(dia).format('ddd'))}
          </h1>
          <p className="text-lg py-4">
            {moment().weekday(dia).format('DD/MM')}
          </p>
          <AtendimentosPendentes data={moment().weekday(dia)} />
        </Card>
      ))}
      <AtendimentoComponent
        data={date}
        visible={modal}
        onCancel={onUnVisibleModal}
      />
    </CardsWrapper>
  );
};

export default AtendimentosContainer;
