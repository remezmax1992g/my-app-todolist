import {AppThunk} from "../redux/redux";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {authAPI} from "../api/auth-api";
import {setIsLogin} from "./auth-reducer";
//constants
const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'
const APP_SET_IS_INITIALIZED = 'APP/SET-IS-INITIALIZED'

const initialState: AppStatusErrorType = {
    status: 'idle',
    error: null,
    isInitialized: false
}


export const appReducer = (state: AppStatusErrorType = initialState, action: AppStatusErrorActionType): AppStatusErrorType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.payload.status}
        case APP_SET_ERROR:
            return {...state, error: action.payload.error}
        case APP_SET_IS_INITIALIZED:
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}
//ActionCreators
export const setError = (error: string | null) => ({type: APP_SET_ERROR, payload:{error}}as const)
export const setStatus = (status: RequestStatusType) => ({type: APP_SET_STATUS, payload:{status}}as const)
export const setIsInitialized = (isInitialized: boolean) => ({type: APP_SET_IS_INITIALIZED, payload:{isInitialized}}as const)
//ThunkCreators
export const getIsInitialized = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.getIsInitialized()
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin(true))

        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch
        (error: any) {
        handleServerNetworkError(error, dispatch)
    }
    finally {
        dispatch(setIsInitialized(true))
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