import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../core/counter/counterSlice';
import { websocketMiddleware } from '../core/websocket/websocketMiddleware'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: {
    websocketMiddleware
  }
});
