import React, { useCallback } from 'react';
import Modal from 'antd/lib/modal';
import Steps from 'antd/lib/steps';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

import stepsCreateLogin from './steps';
import Icons from '../../../Icons';
import { useModaisContext } from '../../../Context/Modais';

const ModalCreateLogin: React.FC = React.memo(() => {
  const {
    modalCreateLoginVisible,
    onModalCreateLoginUnVisible,
  } = useModaisContext();
  const [stepCurrent, setStep] = React.useState(0);

  const setNextStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  const onCancel = useCallback(() => {
    sessionStorage.removeItem('form');
    onModalCreateLoginUnVisible();
  }, [onModalCreateLoginUnVisible]);

  return (
    <Modal
      title="Cadastro"
      visible={modalCreateLoginVisible}
      onCancel={onCancel}
      footer={null}
      centered
      destroyOnClose
    >
      <div className="py-8">
        <Steps current={stepCurrent}>
          <Steps.Step title="Dados Pessoais" icon={Icons.DadosPessoais} />
          <Steps.Step
            title="Dados Residenciais"
            icon={Icons.DadosResidencial}
          />
        </Steps>
        <React.Suspense fallback={<LoadingOutlined translate="span" />}>
          {stepsCreateLogin(setNextStep)[stepCurrent]}
        </React.Suspense>
      </div>
    </Modal>
  );
});

export default ModalCreateLogin;
