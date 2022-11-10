import {createAsyncThunk} from "@reduxjs/toolkit";
import {setStatus} from "./app-reducer";
import {todolistsAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {AxiosError} from "axios";
import {changeStatusTodolistAC} from "./todolists-reducer";

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