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

export const connectionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(error, (state, action) => {
      state.attempting = false
      state.connected = false
      state.error = 'Could not establish a connection to Roomabot. Try to restart Roomabot if the problem persists.'
      console.info('ERROR', action.payload)
    })
    .addCase(connect, (state, action) => {
      state.attempting = true
      console.info('CONNECTING')
    })
    .addCase(open, (state, action) => {
      let url = window.__socket.socket.url
      state.connectedIP = url.replace("wss://", "").replace(/(:\d*)\//, "")
      state.attempting = false
      state.connected = true
      console.info('CONNECTED')
      
    })
    .addCase(close, (state, action) => {
      state.attempting = false
      state.connected = false
      console.info('CLOSED')
    })
    
})

export const roomabot_connecting = state => state.connection.attempting
export const roomabot_connected = state => state.connection.connected
export const roomabot_connection_error = state => state.connection.error
export const roomabot_ip = state => state.connection.connectedIP

