import { createReducer } from '@reduxjs/toolkit';
import { ROS_TOPICS } from '../ros/rosTopics';
import { 
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

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(message, (state, action) => {
      const { topic, message } = action.payload
      state[topic] = message
    })
    
})

// export const roomabot_map = state => state.data.map
export const roomabot_mapping_on = state => state.data.mapping

export const roomabot_map = (state) => state.data[ROS_TOPICS.MAP.topic]