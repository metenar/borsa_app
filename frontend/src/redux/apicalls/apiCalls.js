import axios from "axios"
import {updateStart,updateSuccess,updateFailure} from "../hisseSlice"

export const getHisse=async(dispatch)=>{
    dispatch(updateStart())
    try {
        const res=await axios("http://localhost:5001/api/hisse")
        dispatch(updateSuccess(res.data))
    } catch (error) {
        dispatch(updateFailure())
    }
}