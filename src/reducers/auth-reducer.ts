import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createLog, deleteLog} from "./auth-action";

const slice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false
    },
    reducers: {
        setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createLog.fulfilled, (state) => {
            state.isLogin = true
        })
        builder.addCase(deleteLog.fulfilled, (state) => {
            state.isLogin = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLogin} = slice.actions

//ThunkCreators


export type ActionAuthType = ReturnType<typeof setIsLogin>