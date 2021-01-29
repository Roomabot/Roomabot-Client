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

export const connect = createAction(WEBSOCKET_CONNECT)
export const disconnect = createAction(WEBSOCKET_DISCONNECT)
export const send = createAction(WEBSOCKET_SEND)
// TODO: change the verbaige?
export const message = createAction(WEBSOCKET_MESSAGE)
export const close = createAction(WEBSOCKET_CLOSED)
export const error = createAction(WEBSOCKET_ERROR)
export const open = createAction(WEBSOCKET_OPEN)
