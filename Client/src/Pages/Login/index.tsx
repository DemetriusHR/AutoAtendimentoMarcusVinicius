import React from 'react';

import PageWrapper from '../../Components/PageWrapper';
import LoginContainer from '../../Containers/Login';

const LoginPage: React.FC = () => {
  React.useEffect(() => {
    sessionStorage.setItem('logado', 'n');
  }, []);

  return (
    <PageWrapper>
      <LoginContainer />
    </PageWrapper>
  );
};

export default LoginPage;
