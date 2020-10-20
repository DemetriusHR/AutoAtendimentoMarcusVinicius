import React, { lazy } from 'react';

const CreateLoginDadosPessoaisStep = lazy(() => import('./DadosPessoaisStep'));
const CreateLoginDadosResidenciaisStep = lazy(() => import('./DadosResidenciaisStep'));

const stepsCreateLogin: (
  setNextStep: (step: number) => void
) => JSX.Element[] = (setNextStep: (step: number) => void) => [
  <CreateLoginDadosPessoaisStep setNextStep={setNextStep} />,
  <CreateLoginDadosResidenciaisStep setNextStep={setNextStep} />,
];

export default stepsCreateLogin;
