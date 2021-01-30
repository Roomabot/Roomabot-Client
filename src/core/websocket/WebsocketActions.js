import { createAction } from '@reduxjs/toolkit'
import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_ERROR,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from '@giantmachines/redux-websocket';

export const prefix = "ROOMABOT_WS"
export const connect = createAction(`${prefix}::${WEBSOCKET_CONNECT}`)
export const closeConnection = createAction(`${prefix}::${WEBSOCKET_DISCONNECT}`)
export const send = createAction(`${prefix}::${WEBSOCKET_SEND}`)
export const message = createAction(`${prefix}::${WEBSOCKET_MESSAGE}`)
export const close = createAction(`${prefix}::${WEBSOCKET_CLOSED}`)
export const error = createAction(`${prefix}::${WEBSOCKET_ERROR}`)
export const open = createAction(`${prefix}::${WEBSOCKET_OPEN}`)
