import { configureStore } from '@reduxjs/toolkit'
import hisseReducer from "./hisseSlice"

export default configureStore({
    reducer:{
        hisse:hisseReducer
    }
})
