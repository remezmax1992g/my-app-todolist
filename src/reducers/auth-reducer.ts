import {AppThunk} from "../redux/redux";
import {setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {authAPI, FieldErrorType, LoginParamsType} from "../api/auth-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setTodolistsAC} from "./todolists-reducer";
import {AxiosError} from "axios";


const initialState = {
    isLogin: false
}
export const createLog = createAsyncThunk<{isLogin: boolean}, LoginParamsType, {rejectValue: {errors: string[], fieldsErrors?: Array<FieldErrorType>}}>("auth/login", async (param, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            return {isLogin: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
        const e = error as Error | AxiosError<{e : string}>
        handleServerNetworkError(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [e.message], fieldsErrors: undefined})
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
                state.isLogin = action.payload.isLogin
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
    } catch (error) {
        const e = error as Error | AxiosError<{e : string}>
        handleServerNetworkError(e, dispatch)
    }
}

export type ActionAuthType = ReturnType<typeof setIsLogin>