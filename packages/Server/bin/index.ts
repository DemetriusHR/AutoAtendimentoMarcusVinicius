import 'reflect-metadata';

import Server from 'core';
import registeringDependencies from 'shared/injection/ioc';

(async () => {
  await registeringDependencies();

  return new Server();
})();
