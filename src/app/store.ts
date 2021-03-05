import { configureStore } from '@reduxjs/toolkit';
import { websocketMiddleware } from '../core/websocket/websocketMiddleware'
import { websocketReducer } from '../core/websocket/websocketReducer';
import { dataReducer } from '../core/data/dataReducer'
import { 
  connect,
  closeConnection,
  send,
  message,
  close,
  error,
  open,
} from '../core/websocket/WebsocketActions'
import RosMiddleware from '../core/ros/rosMiddleware';


const ignoreActions = [close.type, connect.type, closeConnection.type,
error.type, message.type, open.type, send.type]

export const rosMiddleware = RosMiddleware({
  prefix: 'ROS',
  onOpen: socket => {
    // @ts-ignore
    window.__socket = socket; // eslint-disable-line no-underscore-dangle,
  },
  // deserializer: yaml.load
});

export default configureStore({
  reducer: {
    websocket: websocketReducer,
    data: dataReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.event'],
      ignoredActions: ignoreActions
    },
    immutableCheck: {
      ignoredPaths: ['data.map']
    }
  }).concat(rosMiddleware)
});
