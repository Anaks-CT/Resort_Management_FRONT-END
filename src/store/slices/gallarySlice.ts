
import {createSlice} from '@reduxjs/toolkit'

const gallarySlice = createSlice({
    name : 'gallary',
    initialState : null,
    reducers : {
        updateGallary(state, action){
            return action.payload
        }
    }
})

export const {updateGallary} = gallarySlice.actions
export default gallarySlice