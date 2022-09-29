import {AppThunk} from "../redux/redux";
import {setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {authAPI, LoginParamsType} from "../api/auth-api";

const SET_IS_LOGIN = "SET-IS-LOGIN"
const initialState: AuthType = {
    isLogin: false
}

export const authReducer = (state: AuthType = initialState, action: ActionAuthType): AuthType => {
    switch(action.type){
        case SET_IS_LOGIN:
            return {...state, isLogin: action.payload.isLogin}
        default:
            return state
    }
}
//ActionCreators
export const setIsLogin = (isLogin: boolean) => ({type: SET_IS_LOGIN, payload: {isLogin}} as const)

//ThunkCreators
export const createLog = (data: LoginParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setStatus("loading"))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin(true))
            dispatch(setStatus("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteLog = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatus("loading"))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin(false))
            dispatch(setStatus("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}

type AuthType = {
    isLogin: boolean
}
export type ActionAuthType = ReturnType<typeof setIsLogin>