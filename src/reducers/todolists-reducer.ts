import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "../redux/redux";
import {RequestStatusType, setStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utilits/error-utilits";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//initialSate
const initialStateForTodolists: TodolistEntityType[] = []
const slice = createSlice({
    name: "todos",
    initialState: initialStateForTodolists,
    reducers:{
        removeTodolistAC(state, action: PayloadAction<{todolistID: string}>){
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>){
            state.unshift({...action.payload.todolist, filter: 'all', status: "idle"})
        },
        editTodolistAC(state, action: PayloadAction<{todolistID: string, title: string}>){
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].title = action.payload.title
        },
        changeFilterTodolistAC(state, action: PayloadAction<{todolistID: string, filter: FilteredValuesType}>){
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].filter = action.payload.filter
        },
        changeStatusTodolistAC(state, action: PayloadAction<{todolistID: string, status: RequestStatusType}>){
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].status = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: TodolistType[]}>){
            return action.payload.todolists.map(tl => ({...tl, filter: "all", status: "idle"}))
        }

    }
})
//reducer
export const todosReducer = slice.reducer
//actionCreators
export const {removeTodolistAC, addTodolistAC, editTodolistAC, changeFilterTodolistAC, changeStatusTodolistAC, setTodolistsAC} = slice.actions
//thunkCreators
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC({todolists: res.data}))
        dispatch(setStatus({status: "succeeded"}))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const createTodolistTC = (newTitle: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatus({status: "loading"}))
        const res = await todolistsAPI.createTodolist(newTitle)
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC({todolist:res.data.data.item}))
            dispatch(setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
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
    // @ts-ignore
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
    } catch (error: any){
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(changeStatusTodolistAC({todolistID, status: "idle"}))
    }
}
//type for Action
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ActionTodolistType =
    | RemoveTodolistACType
    | AddTodolistACType
    | ReturnType<typeof editTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | SetTodolistsACType
    | ReturnType<typeof changeStatusTodolistAC>
//types for state
export type TodolistEntityType = TodolistType & {
    //value
    filter: FilteredValuesType
    status: RequestStatusType
}
export type FilteredValuesType = "all" | "active" | "completed";