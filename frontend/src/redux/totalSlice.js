import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const getTotal=createAsyncThunk("hisse/total",async()=>{
    const res=await axios("http://localhost:5001/api/hisse/alimlar/total")
    return res.data
})

const totalSlice = createSlice({
    name:'total',
    initialState:{
        hisseler:[],
        pending:false,
        error:false
    },
    reducers:{},
    extraReducers:{
        [getTotal.pending]:(state)=>{
            state.pending=true;
            state.error=false;
        },
        [getTotal.fulfilled]:(state,action)=>{
            state.pending=false;
            state.total=action.payload;
        },
        [getTotal.rejected]:(state)=>{
            state.pending=false;
            state.error=true;
        }
    }
})
export default totalSlice.reducer