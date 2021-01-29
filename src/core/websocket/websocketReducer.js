import { createReducer, createSlice } from '@reduxjs/toolkit';
import { 
  connect,
  disconnect,
  send,
  message,
  close,
  error,
  open,
} from './WebsocketActions'

let initialState = {}
export const websocketReducer = createReducer(initialState, (builder) => {
  builder.addCase(connect, (state, action) => {
    console.info('connect called')
    state.connected = true
  })
})
