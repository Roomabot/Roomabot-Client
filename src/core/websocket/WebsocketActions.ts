import { createAction } from '@reduxjs/toolkit'
// import {
//   WEBSOCKET_CLOSED,
//   WEBSOCKET_CONNECT,
//   WEBSOCKET_DISCONNECT,
//   WEBSOCKET_ERROR,
//   WEBSOCKET_MESSAGE,
//   WEBSOCKET_OPEN,
//   WEBSOCKET_SEND,
// } from '@giantmachines/redux-websocket';
import {
  ROS_CONNECT,
  ROS_TOPIC,
  ROS_ERROR,
  ROS_CLOSE,
  ROS_OPEN,
  ROS_DISCONNECT,
  ROS_SUB,
} from '../ros/rosActions'
import { RosTopic } from '../ros/rosTopics'

export const prefix = "ROS"
export const connect = createAction<{url: string}>(`${prefix}::${ROS_CONNECT}`)
export const closeConnection = createAction(`${prefix}::${ROS_DISCONNECT}`)
export const send = createAction(`${prefix}::${ROS_ERROR}`)
export const message = createAction<any>(`${prefix}::${ROS_TOPIC}`)
export const close = createAction(`${prefix}::${ROS_CLOSE}`)
export const error = createAction(`${prefix}::${ROS_ERROR}`)
export const open = createAction(`${prefix}::${ROS_OPEN}`)
export const subscribe = createAction<RosTopic>(`${prefix}::${ROS_SUB}`)
