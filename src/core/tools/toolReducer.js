import { createReducer, createSlice } from '@reduxjs/toolkit';
import { ROS_TOPICS } from '../ros/rosTopics';

let initialState = {
  currentTool: {},
  history: []
}

const toolSlice = createSlice({
  name: 'tools',
  initialState: initialState,
  reducers: {
    selectTool: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentTool = action.payload
    },
  },
});

export const { selectTool } = toolSlice.actions;

export const toolReducer = toolSlice.reducer
export const current_tool = state => state.tools.currentTool