import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "../redux/redux";
import {RequestStatusType, setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const fetchTodolistsTC = createAsyncThunk('todos/fetchTodolists', async (param, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        const res = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(setStatus({status: "succeeded"}))
        const todolists = res.data
        return {todolists}
    } catch (error) {
        const err = error as Error | AxiosError<{ err: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
export const createTodolistTC = createAsyncThunk('todos/createTodolist', async (param: { newTitle: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        const res = await todolistsAPI.createTodolist(param.newTitle)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            const todolist = res.data.data.item
            return {todolist}
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
    name: "todos",
    initialState: [] as TodolistEntityType[],
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistID: string }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state.splice(index, 1)
        },
        editTodolistAC(state, action: PayloadAction<{ todolistID: string, title: string }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].title = action.payload.title
        },
        changeFilterTodolistAC(state, action: PayloadAction<{ todolistID: string, filter: FilteredValuesType }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].filter = action.payload.filter
        },
        changeStatusTodolistAC(state, action: PayloadAction<{ todolistID: string, status: RequestStatusType }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].status = action.payload.status
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", status: "idle"}))
        })
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', status: "idle"})
        })
    }
})
//reducer
export const todosReducer = slice.reducer
//actionCreators
export const {
    removeTodolistAC,
    editTodolistAC,
    changeFilterTodolistAC,
    changeStatusTodolistAC
} = slice.actions
//thunkCreators

export const deleteTodolistTC = (todolistID: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        dispatch(changeStatusTodolistAC({todolistID, status: "loading"}))
        const res = await todolistsAPI.deleteTodolist(todolistID)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC({todolistID}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }

}
export const updateTodolistTC = (todolistID: string, title: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        dispatch(changeStatusTodolistAC({todolistID, status: "loading"}))
        const res = await todolistsAPI.updateTodolist(todolistID, title)
        if (res.data.resultCode === 0) {
            dispatch(editTodolistAC({todolistID, title}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(changeStatusTodolistAC({todolistID, status: "idle"}))
    }
}
//type for Action
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type ActionTodolistType =
    | RemoveTodolistACType
    | ReturnType<typeof editTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof changeStatusTodolistAC>
//types for state
export type TodolistEntityType = TodolistType & {
    //value
    filter: FilteredValuesType
    status: RequestStatusType
}
export type FilteredValuesType = "all" | "active" | "completed";