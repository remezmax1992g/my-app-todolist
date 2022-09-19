//constants
const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'

const initialState: AppStatusErrorType = {
    status: 'idle',
    error: null
}


export const appReducer = (state: AppStatusErrorType = initialState, action: AppStatusErrorActionType): AppStatusErrorType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.payload.status}
        case APP_SET_ERROR:
            return {...state, error: action.payload.error}
        default:
            return state
    }
}
//ActionCreators
export const setError = (error: string | null) => ({type: APP_SET_ERROR, payload:{error}}as const)
export const setStatus = (status: RequestStatusType) => ({type: APP_SET_STATUS, payload:{status}}as const)
//types
export type AppStatusErrorActionType = ReturnType<typeof setError> | ReturnType<typeof setStatus>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusErrorType = {
    status: RequestStatusType
    error: null | string
}