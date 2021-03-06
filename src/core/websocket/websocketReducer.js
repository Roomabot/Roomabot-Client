import { createReducer, createSlice, current } from '@reduxjs/toolkit';
import { 
  connect,
  disconnect,
  send,
  message,
  close,
  error,
  open,
} from './WebsocketActions'

let initialState = {
  attempting: false,
  connected: false,
  error: '',
  connectedIP: ''
}

export const websocketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(error, (state, action) => {
    // console.info('connect called')
      state.attempting = false
      state.connected = false
      console.error(action.payload)
      state.error = 'Could not establish a connection to Roomabot. Try to restart Roomabot if the problem persists.'
    })
    .addCase(connect, (state, action) => {
      console.info('connect called')
      state.attempting = true
    })
    .addCase(open, (state, action) => {
    // console.info('connect called')
      // let url = action.payload.url
      // state.connectedIP = url.replace("ws://", "").replace(/(:\d*)\//, "")
      console.warn('CONNECTED')
      state.connectedIP = 'ws://192.168.0.142'
      state.attempting = false
      state.connected = true
      
    })
    .addCase(close, (state, action) => {
    // console.info('connect called')
      state.attempting = false
      state.connected = false
    })
    
})

export const roomabot_connecting = state => state.websocket.attempting
export const roomabot_connected = state => state.websocket.connected
export const roomabot_connection_error = state => state.websocket.error
export const roomabot_ip = state => state.websocket.connectedIP

