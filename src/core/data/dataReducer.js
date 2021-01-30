import { createReducer, createSlice, current } from '@reduxjs/toolkit';
import { 
  connect,
  disconnect,
  send,
  message,
  close,
  error,
  open,
} from '../websocket/WebsocketActions'

let initialState = {
  map: {},
  mapping: false,
  error: ''
}
export const CONNECTION_STATUS = "Connection Status"
export const START = "Start"
export const SAVE = "Save"
export const LOAD = "Load"

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(message, (state, action) => {
    // map to state (deserialize is done with middleware)
      let msg = action.payload.message
      if (msg.command){
        switch (msg.command) {
          case CONNECTION_STATUS:
            state.mapping = msg.arg1 === "1" 
            break;
          default:
            break;
        }

      }
    })
    
})

export const roomabot_mapping_on = state => state.data.mapping
