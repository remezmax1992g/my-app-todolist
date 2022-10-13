import {AppThunk} from "../redux/redux";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {authAPI} from "../api/auth-api";
import {setIsLogin} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AppStatusErrorType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setError(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
        setIsInitialized(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
    }
}})

export const appReducer = slice.reducer


//ActionCreators
export const {setError, setStatus, setIsInitialized} = slice.actions
//ThunkCreators
export const getIsInitialized = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.getIsInitialized()
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin({isLogin: true}))

        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch
        (error: any) {
        handleServerNetworkError(error, dispatch)
    }
    finally {
        dispatch(setIsInitialized({isInitialized:true}))
    }
}
//types
export type AppStatusErrorActionType = ReturnType<typeof setError> | ReturnType<typeof setStatus> | ReturnType<typeof setIsInitialized>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusErrorType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}