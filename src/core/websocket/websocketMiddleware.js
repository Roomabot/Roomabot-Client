import reduxWebsocket from '@giantmachines/redux-websocket';
import { prefix } from './WebsocketActions' 

// Create the middleware instance.
export const websocketMiddleware = reduxWebsocket({
  prefix: prefix,
  onOpen: (socket) => {
    // @ts-ignore
    window.__socket = socket; // eslint-disable-line no-underscore-dangle,
  },
});
 