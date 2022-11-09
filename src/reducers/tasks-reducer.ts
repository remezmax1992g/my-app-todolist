import {
    addTodolistAC,
    AddTodolistACType, removeTodolistAC,
    RemoveTodolistACType, setTodolistsAC,
    SetTodolistsACType
} from "./todolists-reducer";
import {tasksAPI, TaskStatus, TaskType} from "../api/tasks-api";
import {AppRootState, AppThunk} from "../redux/redux";
import {setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
//initialState
const initialStateForTasks: TasksType = {}
//TC
export const fetchTaskTC = createAsyncThunk('tasks/fetchTasks', async (todolistID: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
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
export const createTaskTC = createAsyncThunk('tasks/addTask', async (param:{todolistID: string, newTitle: string}, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
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
export const deleteTaskTC = createAsyncThunk('tasks/deleteTask', async (param:{todolistID: string, taskID: string}, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
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
export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param:{todolistID: string, taskID: string, title: string}, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatus({status: "loading"}))
        const state = thunkAPI.getState() as AppRootState
        const findedTask = state.tasks[param.todolistID].find(task => task.id === param.taskID)
        if (!findedTask) {
            thunkAPI.dispatch(setStatus({status: "failed"}))
            return thunkAPI.rejectWithValue("Task wasn't found in the state")
        }
        const res = await tasksAPI.updateTask(param.todolistID, param.taskID, {...findedTask, title: param.title})
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus({status: "succeeded"}))
            return {todolistID: param.todolistID,taskID: param.taskID, title: param.title}
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


const slice = createSlice(({
    name: "tasks",
    initialState: initialStateForTasks,
    reducers: {
        changeStatusCheckboxAC(state, action: PayloadAction<{ todolistID: string, taskID: string, status: TaskStatus }>) {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todolistID][index].status = action.payload.status
        },

    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistID]
        })
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTaskTC.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks
        })
        builder.addCase(createTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
        })
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
                const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload?.taskID)
                state[action.payload.todolistID].splice(index, 1)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todolistID][index].title = action.payload.title
        })
    }
}))
//reducer
export const tasksReducer = slice.reducer
//actionCreators
export const {changeStatusCheckboxAC} = slice.actions

export const changeStatusTaskTC = (todolistID: string, taskID: string, status: TaskStatus): AppThunk => async (dispatch, getState: () => AppRootState) => {
    try {
        dispatch(setStatus({status: "loading"}))
        const findedTask = getState().tasks[todolistID].find(task => task.id === taskID)
        if (!findedTask) {
            console.warn("Task wasn't found in the state")
            dispatch(setStatus({status: "failed"}))
            return
        }
        const res = await tasksAPI.updateTask(todolistID, taskID, {
            title: findedTask.title,
            description: findedTask.description,
            status: status,
            priority: findedTask.priority,
            startDate: findedTask.startDate,
            deadline: findedTask.deadline
        })
        if (res.data.resultCode === 0) {
            dispatch(changeStatusCheckboxAC({todolistID, taskID, status}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch
        (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
//type for Action
export type ActionTaskType =
    | RemoveTodolistACType
    | AddTodolistACType
    | ReturnType<typeof changeStatusCheckboxAC>
    | SetTodolistsACType
//types for state
export type TasksType = {
    [key: string]: TaskType[]
}