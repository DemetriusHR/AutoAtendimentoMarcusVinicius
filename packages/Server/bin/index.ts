import 'reflect-metadata';

import Server from 'core';
import registeringDependencies from 'shared/injection/ioc';

registeringDependencies()
  .then(() => new Server())
  .catch((err) => console.error(err));
