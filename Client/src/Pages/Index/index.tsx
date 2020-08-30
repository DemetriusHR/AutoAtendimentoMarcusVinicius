import React from 'react';

import PageWrapper from '../../Components/PageWrapper';
import IndexContainer from '../../Containers/Index';

const IndexPage: React.FC<any> = ({ history }) => {
  React.useEffect(() => {
    const logado = sessionStorage.getItem('logado');

    if (logado !== 's') {
      history.push('/');
    }
  }, [history]);

  return (
    <PageWrapper>
      <IndexContainer />
    </PageWrapper>
  );
};

export default IndexPage;
