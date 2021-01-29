import { configureStore } from '@reduxjs/toolkit';
import { websocketMiddleware } from '../core/websocket/websocketMiddleware'
import { websocketReducer } from '../core/websocket/websocketReducer';
import { 
  connect,
  closeConnection,
  send,
  message,
  close,
  error,
  open,
} from '../core/websocket/WebsocketActions'


const ignoreActions = [close.type, connect.type, closeConnection.type,
error.type, message.type, open.type, send.type
] 
export default configureStore({
  reducer: {
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.event'],
      ignoredActions: ignoreActions
    },
  }).concat(websocketMiddleware)
});
