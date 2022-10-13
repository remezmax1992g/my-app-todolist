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
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
//initialState
const initialStateForTasks: TasksType = {}
const slice = createSlice(({
    name: "tasks",
    initialState: initialStateForTasks,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistID: string, id: string }>) {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.id)
            state[action.payload.todolistID].splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        changeStatusCheckboxAC(state, action: PayloadAction<{ todolistID: string, id: string, status: TaskStatus }>) {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.id)
            state[action.payload.todolistID][index].status = action.payload.status
        },
        editTaskAC(state, action: PayloadAction<{ todolistID: string, id: string, title: string }>) {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.id)
            state[action.payload.todolistID][index].title = action.payload.title
        },
        setTasksAC(state, action: PayloadAction<{ todolistID: string, tasks: TaskType[] }>) {
            state[action.payload.todolistID] = action.payload.tasks
        }
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

    }
}))
export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, changeStatusCheckboxAC, editTaskAC, setTasksAC} = slice.actions

//ThunkCreators
export const fetchTaskTC = (todolistID: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        const res = await tasksAPI.getTask(todolistID)
        dispatch(setTasksAC({todolistID: todolistID, tasks: res.data.items}))
        dispatch(setStatus({status: "succeeded"}))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const createTaskTC = (todolistID: string, newTitle: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        const res = await tasksAPI.createTask(todolistID, newTitle)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch
        (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteTaskTC = (todolistID: string, taskID: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        const res = await tasksAPI.deleteTask(todolistID, taskID)
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC({todolistID: todolistID, id: taskID}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch
        (error: any) {
        handleServerNetworkError(error, dispatch)
    }

}
export const updateTaskTC = (todolistID: string, taskID: string, newTitle: string): AppThunk => async (dispatch, getState: () => AppRootState) => {
    try {
        dispatch(setStatus({status: "loading"}))
        const findedTask = getState().tasks[todolistID].find(task => task.id === taskID)
        if (!findedTask) {
            console.warn("Task wasn't found in the state")
            dispatch(setStatus({status: "failed"}))
            return
        }
        const res = await tasksAPI.updateTask(todolistID, taskID, {
            title: newTitle,
            description: findedTask.description,
            status: findedTask.status,
            priority: findedTask.priority,
            startDate: findedTask.startDate,
            deadline: findedTask.deadline
        })
        if (res.data.resultCode === 0) {
            dispatch(editTaskAC({todolistID: todolistID, id: taskID, title: newTitle}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch
        (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
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
            dispatch(changeStatusCheckboxAC({todolistID: todolistID, id: taskID, status: status}))
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
    | ReturnType<typeof removeTaskAC>
    | RemoveTodolistACType
    | ReturnType<typeof addTaskAC>
    | AddTodolistACType
    | ReturnType<typeof changeStatusCheckboxAC>
    | ReturnType<typeof editTaskAC>
    | SetTodolistsACType
    | ReturnType<typeof setTasksAC>
//types for state
export type TasksType = {
    [key: string]: TaskType[]
}