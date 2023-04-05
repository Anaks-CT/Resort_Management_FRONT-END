import { createSlice } from "@reduxjs/toolkit";

const allResortSlice = createSlice({
  name: "resortDetails",
  initialState: null,
  reducers: {
    updateAllResortDetails(state, action) {
      return action.payload
    },
  },
});



export const { updateAllResortDetails } = allResortSlice.actions;
export default allResortSlice;
