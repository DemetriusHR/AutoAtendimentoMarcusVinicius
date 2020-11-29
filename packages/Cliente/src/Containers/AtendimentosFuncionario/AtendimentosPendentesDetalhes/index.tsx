import React, { useCallback, useEffect, useMemo } from 'react';
import Modal from 'antd/lib/modal';
import moment from 'moment';
import Collapse from 'antd/lib/collapse';

import {
  horariosDiaNormal,
  horariosDiaSabado,
} from '../../../Utils/HorariosAtendimento';
import AtendimentoPendenteHeader from './Components/Header';
import useAtendimentosPendentes from '../../../Hooks/useAtendimentosPendentes';
import IHorarios from '../../../Interfaces/IHorarios';
import DetalhesProdutosCadastro from './ProdutosCadastro';
import { useUsuarioContext } from '../../../Context/Usuario';
import { usePedidosPendentesContext } from '../../../Context/PedidosPendentes';

interface IAtendimentosPendentesDetalhes {
  data: moment.Moment;
  visible: boolean;
  onCancel: () => void;
}

const AtendimentosPendentesDetalhes: React.FC<IAtendimentosPendentesDetalhes> = React.memo(
  ({ data, visible, onCancel }: IAtendimentosPendentesDetalhes) => {
    const { resetDadosUsuario } = useUsuarioContext();
    const { getPedidos } = usePedidosPendentesContext();
    const { state, getAtendimentosPendentes } = useAtendimentosPendentes();

    const dataAtendimento: string = useMemo(
      () => `Atendimentos do Dia ${data.format('DD/MM')}`,
      [data],
    );

    const dataSemana = useMemo(() => data.weekday(), [data]);

    useEffect(() => {
      if (visible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'initial';
      }

      getAtendimentosPendentes(data, resetDadosUsuario);
    }, [visible, getAtendimentosPendentes, data, resetDadosUsuario]);

    const arrayHorarios = useMemo(() => {
      if (data.weekday() === 6) {
        return horariosDiaNormal(data);
      }

      return horariosDiaSabado(data);
    }, [data]);

    const getDadosHorario = useCallback(
      (dataListada: moment.Moment) => {
        let horarioRetornado: IHorarios = {
          key: 1,
          data: moment(),
          horarioInicial: '00:00',
          horarioFinal: '00:00',
        };

        arrayHorarios.forEach((horario) => {
          if (horario.data.isSame(dataListada)) {
            horarioRetornado = horario;
          }
        });

        return horarioRetornado;
      },
      [arrayHorarios],
    );

    const onCloseModal = useCallback(() => {
      onCancel();
      getPedidos();
    }, [getPedidos, onCancel]);

    return dataSemana ? (
      <Modal
        title={dataAtendimento}
        visible={visible}
        onCancel={onCloseModal}
        footer={null}
        destroyOnClose
      >
        <Collapse bordered={false} className="pedido-collapse">
          {state.atendimentosPendentes.map((atendimento) => (
            <Collapse.Panel
              key={atendimento.idatendimento}
              header={(
                <AtendimentoPendenteHeader
                  horario={getDadosHorario(atendimento.dataatendimento)}
                  cliente={atendimento.nomecliente}
                />
              )}
              className="pedido-collapse-panel"
            >
              <DetalhesProdutosCadastro
                atendimento={atendimento}
                onFechaModal={onCloseModal}
                data={data}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      </Modal>
    ) : null;
  },
);

export default AtendimentosPendentesDetalhes;
