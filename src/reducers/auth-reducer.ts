import {AppThunk} from "../redux/redux";
import {setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {authAPI, LoginParamsType} from "../api/auth-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setTodolistsAC} from "./todolists-reducer";


const initialState = {
    isLogin: false
}
export const createLog = createAsyncThunk("auth/login", async (param: LoginParamsType, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            return {isLogin: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createLog.fulfilled, (state, action) => {
            if(action.payload) {
                state.isLogin = action.payload.isLogin
            }
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLogin} = slice.actions

//ThunkCreators
export const deleteLog = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin({isLogin: false}))
            dispatch(setTodolistsAC({todolists: []}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}

export type ActionAuthType = ReturnType<typeof setIsLogin>