import {AppThunk} from "../redux/redux";
import {setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {authAPI, LoginParamsType} from "../api/auth-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLogin: false
}
const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLogin} = slice.actions

//ThunkCreators
export const createLog = (data: LoginParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin({isLogin: true}))
            dispatch(setStatus({status:"succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteLog = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status:"loading"}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin({isLogin: false}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}

export type ActionAuthType = ReturnType<typeof setIsLogin>