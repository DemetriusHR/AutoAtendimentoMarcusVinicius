import 'reflect-metadata';
import * as http from 'http';

import * as serverHandlers from './serverHandlers';
import ServerAPI from './server';

(async (): Promise<void> => {
  const serverAPI: ServerAPI = new ServerAPI();

  const Server: http.Server = http.createServer(serverAPI.app);

  Server.listen(serverAPI.app.get('port'), () =>
    console.log(`Exec in: http://localhost:${serverAPI.app.get('port')}`)
  );

  /**
   * Server Events
   */
  Server.on('error', (error: Error) =>
    serverHandlers.onError(error, serverAPI.app.get('port'))
  );
  Server.on('listening', serverHandlers.onListening.bind(Server));
})();
