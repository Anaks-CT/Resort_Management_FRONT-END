import { createSlice } from "@reduxjs/toolkit";

const resortSlice = createSlice({
  name: "resort",
  initialState: {},
  reducers: {
    updateResort(state, action) {
      return {
        resortId: action.payload.resortId,
        resortName: action.payload.resortName,
      };
    },
  },
});



export const { updateResort } = resortSlice.actions;
export default resortSlice;
