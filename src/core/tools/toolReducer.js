import { createSlice } from '@reduxjs/toolkit';
import { TOOL } from './model';

let initialState = {
  currentTool: TOOL.SELECTION,
  measureData: {
    distance: 0
  },
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
    updateMeasuredDistance: (state, action) => {
      state.measureData.distance = action.payload
    }
  },
});

export const { selectTool, updateMeasuredDistance } = toolSlice.actions;

export const toolReducer = toolSlice.reducer
export const current_tool = state => state.tools.currentTool
export const measuredDistance = state => state.tools.measureData.distance