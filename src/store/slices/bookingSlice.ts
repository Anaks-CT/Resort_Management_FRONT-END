
import {createSlice} from '@reduxjs/toolkit'

const checkRoomAvailbilitySlice = createSlice({
    name : 'Room Availbility',
    initialState : {
        destination: {
            name: "",
            id: "",
          },
          roomDetail: [""],
          date: {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
    },
    reducers : {
        updateRoomAvailabilityDetails(state, action){
            return action.payload
        }
    }
})

export const {updateRoomAvailabilityDetails} = checkRoomAvailbilitySlice.actions
export default checkRoomAvailbilitySlice