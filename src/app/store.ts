import { configureStore } from '@reduxjs/toolkit';
import { websocketMiddleware } from '../core/websocket/websocketMiddleware'
import { websocketReducer } from '../core/websocket/websocketReducer';
export default configureStore({
  reducer: {
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.event'],
      ignoredActions: ['REDUX_WEBSOCKET::OPEN', 'REDUX_WEBSOCKET::CONNECT'],
    },
  }).concat(websocketMiddleware)
});
