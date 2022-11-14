import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../api/auth-api";
import {setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {AxiosError} from "axios";
import {fetchTodolistsTC} from "./todos-action";
import {AppThunkError} from "../redux/redux";

export const createLog = createAsyncThunk<undefined, LoginParamsType, AppThunkError>("auth/login", async (param, thunkAPI) => {
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
export const deleteLog = createAsyncThunk<undefined, undefined, AppThunkError>("auth/logout", async (param, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            thunkAPI.dispatch(fetchTodolistsTC.fulfilled({todolists: []}, "requestID", undefined))
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