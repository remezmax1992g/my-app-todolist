import {authAPI} from "../api/auth-api";
import {setIsLogin} from "./auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AppStatusErrorType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
export const getIsInitialized = createAsyncThunk("app/getIsInitialized", async (param, thunkAPI) => {
    const res = await authAPI.getIsInitialized()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLogin({isLogin: true}))
    }
})

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setError(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getIsInitialized.fulfilled, (state) => {
            state.isInitialized = true
        })
    }

})

export const appReducer = slice.reducer


//ActionCreators
export const {setError, setStatus} = slice.actions
//ThunkCreators

//types
export type AppStatusErrorActionType =
    | ReturnType<typeof setError>
    | ReturnType<typeof setStatus>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusErrorType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}