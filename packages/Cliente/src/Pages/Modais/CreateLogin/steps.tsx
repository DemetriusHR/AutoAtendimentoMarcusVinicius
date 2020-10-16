import React from 'react';
import CreateLoginDadosPessoaisStep from './DadosPessoaisStep';
import CreateLoginDadosResidenciaisStep from './DadosResidenciaisStep';

const stepsCreateLogin: (
  setNextStep: (
    step: number,
  ) => void,
) => JSX.Element[] = (
  setNextStep: (
    step: number
  ) => void,
) => ([
  (
    <CreateLoginDadosPessoaisStep
      setNextStep={
        setNextStep
      }
    />
  ),
  (
    <CreateLoginDadosResidenciaisStep
      setNextStep={
        setNextStep
      }
    />
  ),
]);

export default stepsCreateLogin;
