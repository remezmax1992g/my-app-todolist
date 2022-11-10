import {setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {authAPI, FieldErrorType, LoginParamsType} from "../api/auth-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {fetchTodolistsTC} from "./todos-action";

export const createLog = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: string[], fieldsErrors?: Array<FieldErrorType> } }>("auth/login", async (param, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
        const err = error as Error | AxiosError<{ err: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    }
})
export const deleteLog = createAsyncThunk("auth/logout", async (param, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            thunkAPI.dispatch(fetchTodolistsTC.fulfilled({todolists: []}, "requestID"))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        const err = error as Error | AxiosError<{ err: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

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