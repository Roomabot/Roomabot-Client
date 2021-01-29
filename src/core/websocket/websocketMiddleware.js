import reduxWebsocket from '@giantmachines/redux-websocket';
 
 
// Create the middleware instance.
export const websocketMiddleware = reduxWebsocket({
  onOpen: (socket) => {
    // @ts-ignore
    window.__socket = socket; // eslint-disable-line no-underscore-dangle
  },
});
 