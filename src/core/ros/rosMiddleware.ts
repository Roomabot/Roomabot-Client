import { Middleware, MiddlewareAPI } from 'redux'
import ROSLIB from 'roslib'
import { ReduxROS } from './reduxROS';
import { RosOptions } from './rosOptions';
import { 
  ROS_CLOSE,
  ROS_DISCONNECT,
  ROS_CONNECT,
  ROS_SUB,
  ROS_UNSUB
} from './rosActions'
import { Action } from '@reduxjs/toolkit';

const defaultOptions: RosOptions = {
  prefix: 'ROS',
  onOpen: null
}

const RosMiddleware = (rawOptions?: RosOptions): Middleware => {
  const options = { ...defaultOptions, ...rawOptions };
  const { prefix } = options;
  const actionPrefixExp = RegExp(`^${prefix}::`); // msg ROS::

  // Create a new redux websocket instance.

  const reduxRos = new ReduxROS(options);

  // Define the list of handlers, now that we have an instance of ReduxWebSocket.
  const handlers = {
    [ROS_DISCONNECT]: reduxRos.disconnect,
    [ROS_CONNECT]: reduxRos.connect,
    [ROS_SUB]: reduxRos.subscribe,
    [ROS_UNSUB]: reduxRos.unsubscribe,
  };

  // Middleware function.
  return (store: MiddlewareAPI) => (next) => (action: Action) => {
    const { dispatch } = store;
    const { type: actionType } = action;

    // Check if action type matches prefix
    if (actionType && actionType.match(actionPrefixExp)) {
      const baseActionType = action.type.replace(actionPrefixExp, '');
      const handler = Reflect.get(handlers, baseActionType);

      // if (action.meta && action.meta.timestamp) {
      //   // eslint-disable-next-line no-param-reassign
      //   action.meta.timestamp = dateSerializer(action.meta.timestamp);
      // }

      if (handler) {
        try {
          handler(store, action);
        } catch (err) {
          console.error(err)
          // TODO: Dispatch error event
          // dispatch(error(action, err, prefix));
        }
      }
    }

    return next(action);
  };
};
 
export default RosMiddleware;