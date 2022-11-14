//TC
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setStatus} from "./app-reducer";
import {tasksAPI, TaskStatus, TaskType} from "../api/tasks-api";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {AxiosError} from "axios";
import {AppRootState, AppThunkError} from "../redux/redux";

export const fetchTaskTC = createAsyncThunk<{ todolistID: string, tasks: TaskType[] }, string, AppThunkError>('tasks/fetchTasks', async (todolistID, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: "loading"}))
    try {
        const res = await tasksAPI.getTask(todolistID)
        thunkAPI.dispatch(setStatus({status: "succeeded"}))
        const tasks = res.data.items
        return {todolistID, tasks}
    } catch (error) {
        const err = error as Error | AxiosError<{ err: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
export const createTaskTC = createAsyncThunk<{ task: TaskType }, { todolistID: string, newTitle: string }, AppThunkError>('tasks/addTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: "loading"}))
    try {
        const res = await tasksAPI.createTask(param.todolistID, param.newTitle)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            const task = res.data.data.item
            return {task}
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
export const deleteTaskTC = createAsyncThunk<{ todolistID: string, taskID: string }, { todolistID: string, taskID: string }, AppThunkError>('tasks/deleteTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: "loading"}))
    try {
        const res = await tasksAPI.deleteTask(param.todolistID, param.taskID)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            return {todolistID: param.todolistID, taskID: param.taskID}
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
export const updateTaskTC = createAsyncThunk<{ todolistID: string, taskID: string, title: string }, { todolistID: string, taskID: string, title: string }, AppThunkError>('tasks/updateTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: "loading"}))
    const state = thunkAPI.getState() as AppRootState
    const findedTask = state.tasks[param.todolistID].find(task => task.id === param.taskID)
    if (!findedTask) {
        thunkAPI.dispatch(setStatus({status: "failed"}))
        return thunkAPI.rejectWithValue({errors: ["Task wasn't found in the state"]})
    }
    try {
        const res = await tasksAPI.updateTask(param.todolistID, param.taskID, {...findedTask, title: param.title})
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            return {todolistID: param.todolistID, taskID: param.taskID, title: param.title}
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
export const changeStatusTaskTC = createAsyncThunk<{ todolistID: string, taskID: string, status: TaskStatus }, { todolistID: string, taskID: string, status: TaskStatus }, AppThunkError>('tasks/changeStatusTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: "loading"}))
    const state = thunkAPI.getState() as AppRootState
    const findedTask = state.tasks[param.todolistID].find(task => task.id === param.taskID)
    if (!findedTask) {
        thunkAPI.dispatch(setStatus({status: "failed"}))
        return thunkAPI.rejectWithValue({errors: ["Task wasn't found in the state"]})
    }
    try {
        const res = await tasksAPI.updateTask(param.todolistID, param.taskID, {...findedTask, status: param.status})
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            return {todolistID: param.todolistID, taskID: param.taskID, status: param.status}
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