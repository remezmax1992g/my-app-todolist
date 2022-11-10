import {todolistsAPI, TodolistType} from "../api/todolists-api";
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
export const deleteTodolistTC = createAsyncThunk('todos/deleteTodolist', async (param: { todolistID: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        thunkAPI.dispatch(changeStatusTodolistAC({todolistID: param.todolistID, status: "loading"}))
        const res = await todolistsAPI.deleteTodolist(param.todolistID)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            return {todolistID: param.todolistID}
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
export const updateTodolistTC = createAsyncThunk('todos/updateTodolist', async (param: { todolistID: string, title: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        thunkAPI.dispatch(changeStatusTodolistAC({todolistID: param.todolistID, status: "loading"}))
        const res = await todolistsAPI.updateTodolist(param.todolistID, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            thunkAPI.dispatch(changeStatusTodolistAC({todolistID: param.todolistID, status: 'succeeded'}))
            return {todolistID: param.todolistID, title: param.title}
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
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state.splice(index, 1)
        })
        builder.addCase(updateTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].title = action.payload.title
        })
    }
})
//reducer
export const todosReducer = slice.reducer
//actionCreators
export const {
    changeFilterTodolistAC,
    changeStatusTodolistAC
} = slice.actions
//thunkCreators


//type for Action
export type ActionTodolistType =
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof changeStatusTodolistAC>
//types for state
export type TodolistEntityType = TodolistType & {
    //value
    filter: FilteredValuesType
    status: RequestStatusType
}
export type FilteredValuesType = "all" | "active" | "completed";