
import {createSlice} from '@reduxjs/toolkit'

const currentResortSlice = createSlice({
    name : 'resort',
    initialState : {},
    reducers : {
        addResort(){

        }
    }
})

export const {addResort} = currentResortSlice.actions
export default currentResortSlice