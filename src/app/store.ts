import { configureStore } from '@reduxjs/toolkit';
import { websocketMiddleware } from '../core/websocket/websocketMiddleware'
import { connectionReducer } from '../core/websocket/connectionReducer';
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
import { ROS_TOPICS } from '../core/ros/rosTopics';
import { toolReducer } from '../core/tools/toolReducer';


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
    connection: connectionReducer,
    data: dataReducer,
    tools: toolReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.event'],
      ignoredActions: ignoreActions
    },
    immutableCheck: {
      ignoredPaths: [`data.${ROS_TOPICS.MAP.topic}`]
    }
  }).concat(rosMiddleware)
});
