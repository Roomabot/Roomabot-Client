import { createReducer } from '@reduxjs/toolkit';
import { ROS_TOPICS } from '../ros/rosTopics';
import { 
  dismissError,
  message,
} from '../websocket/WebsocketActions'

let initialState = {
  map: {},
  mapping: false,
  error: '',
  topics: [],

}
export const CONNECTION_STATUS = "Connection Status"
export const START = "Start"
export const SAVE = "Save"
export const LOAD = "Load"
export const ERR = "Error"
export const MotorErrors = {'1': 'Motor Error - Check battery and restart.', 
'2': 'Motor behaving unexpectedly, please restart.'} 

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(message, (state, action) => {
      const { topic, message } = action.payload
      if (topic === '/status' || topic === '/errors'){
        // special case
        if (message.command){
          switch (message.command) {
            case CONNECTION_STATUS:
              state.mapping = message.arg1 === "1" 
              break;
            case ERR:
              state.error = MotorErrors[message.arg1]
              break;
            default:
              break;
          }
        }
      }
      else{
        state[topic] = message
      }
    })
    .addCase(dismissError, (state, action) => {
      state.error = ''
    })
    
})

// export const roomabot_map = state => state.data.map
export const roomabot_mapping_on = state => state.data.mapping
export const roomabot_error = state => state.data.error

export const roomabot_map = (state) => state.data[ROS_TOPICS.MAP.topic]