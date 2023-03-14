import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const gethisseler=createAsyncThunk("get/hisse",async()=>{
    const res= await axios("http://localhost:5001/api/hisse")
    return res.data
})
export const updateAlimlar=createAsyncThunk("update/alimlar",async(info)=>{
    let code=info.code
    let id=info.item._id
    const res= await axios.put(`http://localhost:5001/api/hisse/update/${code}/alimlar/${id}`,info.data)
    return res.data
})
export const updateBedel=createAsyncThunk("update/bedel",async(info)=>{
    let code=info.code
    let id=info.item._id
    const res= await axios.put(`http://localhost:5001/api/hisse/update/${code}/bedel/${id}`,info.data)
    return res.data
})
export const deleteAlim=createAsyncThunk("delete/alim",async(info)=>{
    const id=info.id
    await axios.delete(`http://localhost:5001/api/hisse/alimlar/${id}`)
    return info
})
export const deleteBedel=createAsyncThunk("delete/bedel",async(info)=>{
    const id=info.id
    await axios.delete(`http://localhost:5001/api/hisse/bedel/${id}`)
    return info
})

const hisseSlice = createSlice({
    name:'hisse',
    initialState:{
        hisse:{},
        pending:false,
        error:false,
    },
    reducers:{
    },
    extraReducers:{
        [gethisseler.pending]:(state)=>{
            state.pending=true;
            state.error=false;
        },
        [gethisseler.fulfilled]:(state,action)=>{
            state.pending=false;
            state.hisse=action.payload;
        },
        [gethisseler.rejected]:(state)=>{
            state.pending=false;
            state.error=true;
        },
        [updateAlimlar.pending]:(state)=>{
            state.pending=true;
            state.error=false;
        },
        [updateAlimlar.fulfilled]:(state,action)=>{
            state.pending=false;            
            let newtemp=state.hisse.filter(hisse=>hisse.code!==action.payload.code)
            state.hisse=[...newtemp,action.payload]
        },
        [updateAlimlar.rejected]:(state)=>{
            state.pending=false;
            state.error=true;
        },
        [updateBedel.pending]:(state)=>{
            state.pending=true;
            state.error=false;
        },
        [updateBedel.fulfilled]:(state,action)=>{
            state.pending=false;            
            let newtemp=state.hisse.filter(hisse=>hisse.code!==action.payload.code)
            state.hisse=[...newtemp,action.payload]
        },
        [updateBedel.rejected]:(state)=>{
            state.pending=false;
            state.error=true;
        },
        [deleteAlim.pending]:(state)=>{
            state.pending=true;
            state.error=false;
        },
        [deleteAlim.fulfilled]:(state,action)=>{
            state.pending=false;            
            let tempState=state.hisse.filter(hisse=>hisse.code!==action.payload.code)
            let newtemp=state.hisse.filter(hisse=>hisse.code===action.payload.code)[0]
            let tempAlim=newtemp.alimlar.filter(alim=>alim._id!==action.payload.id)
            newtemp.alimlar=tempAlim
            state.hisse=[...tempState, newtemp]
        },
        [deleteAlim.rejected]:(state)=>{
            state.pending=false;
            state.error=true;
        },
        [deleteBedel.pending]:(state)=>{
            state.pending=true;
            state.error=false;
        },
        [deleteBedel.fulfilled]:(state,action)=>{
            state.pending=false;            
            let tempState=state.hisse.filter(hisse=>hisse.code!==action.payload.code)
            let newtemp=state.hisse.filter(hisse=>hisse.code===action.payload.code)[0]
            let tempBedel=newtemp.bedelli_bedellsiz.filter(bedel=>bedel._id!==action.payload.id)
            newtemp.bedelli_bedellsiz=tempBedel
            state.hisse=[...tempState, newtemp]
        },
        [deleteBedel.rejected]:(state)=>{
            state.pending=false;
            state.error=true;
        }
    }
    
});

export const {updateStart,updateSuccess,updateFailure}=hisseSlice.actions;
export default hisseSlice.reducer;