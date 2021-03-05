import { createReducer } from '@reduxjs/toolkit';
import { 
  message,
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
      // let msg = action.payload.message
      // if (msg){
      //   switch (msg.command) {
      //     case CONNECTION_STATUS:
      //       state.mapping =  true// msg.arg1 === "1"
      //       break;
      //     default:
      //       break;
      //   }
      // }
      // else{ // map
        state.map = action.payload
      // } 
    })
    
})

export const roomabot_map = state => state.data.map
export const roomabot_mapping_on = state => state.data.mapping
