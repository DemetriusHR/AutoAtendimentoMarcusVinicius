import React from 'react';

import PageWrapper from '../../Components/PageWrapper';
import CriarLoginContainer from '../../Containers/CriarLogin';

const CriarLoginPage: React.FC = () => {

  return (
    <PageWrapper>
      <CriarLoginContainer />
    </PageWrapper>
  );
};

export default CriarLoginPage;
