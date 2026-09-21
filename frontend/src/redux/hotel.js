import { createSlice } from "@reduxjs/toolkit";

const slice=createSlice({
    name:"hotels",
    initialState:{
        data:[]
    },
    reducers:{
        setHotels:(state,action)=>{
            state.data=action.payload;
        },
        deleteHotel:(state,action)=>{
            state.data=state.data.filter((hotel)=>
            hotel.id!==action.payload)
        }
    }
})

export const {setHotels,deleteHotel}=slice.actions;

export default slice.reducer;