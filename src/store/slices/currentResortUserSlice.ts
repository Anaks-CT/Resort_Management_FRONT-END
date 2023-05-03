import { createSlice } from "@reduxjs/toolkit";

const currentResortUser = createSlice({
  name: "resort",
  initialState: {},
  reducers: {
    updateCurrentResort(state, action) {
      return {
        resortId: action.payload.resortId,
        resortName: action.payload.resortName,
      };
    },
    removeCurrentResort(state){
        return {}
    }
  },
});



export const { updateCurrentResort, removeCurrentResort } = currentResortUser.actions;
export default currentResortUser;
