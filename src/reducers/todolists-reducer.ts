import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "../redux/redux";

//constants
export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const EDIT_TODOLIST_TITLE = "EDIT-TODOLIST-TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"
export const SET_TODOLISTS = "SET-TODOLISTS"
//initialSate
export let todolistID1 = v1();
export let todolistID2 = v1();
const initialStateForTodolists: TodolistEntityType[] = []
//reducer
export const todolistsReducer = (state: TodolistEntityType[] = initialStateForTodolists, action: ActionTodolistType): Array<TodolistEntityType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(td => td.id !== action.payload.todolistID)
        case ADD_TODOLIST:
            return [{...action.payload.todolist, filter: 'all'}, ...state]
        case EDIT_TODOLIST_TITLE:
            return state.map(td => td.id === action.payload.todolistID ? {...td, title: action.payload.newTitle} : td)
        case CHANGE_TODOLIST_FILTER:
            return state.map(td => td.id === action.payload.todolistID ? {...td, filter: action.payload.newFilter} : td)
        case SET_TODOLISTS:
            return action.payload.todolists.map(tl => ({...tl, filter: "all"}))
        default:
            return state

    }
}
//ActionCreators
export const removeTodolistAC = (todolistID: string) => ({type: REMOVE_TODOLIST, payload: {todolistID}} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: ADD_TODOLIST, payload: {todolist}} as const)
export const editTodolistAC = (todolistID: string, newTitle: string) => ({
    type: EDIT_TODOLIST_TITLE,
    payload: {todolistID, newTitle}
} as const)
export const changeFilterTodolistAC = (todolistID: string, newFilter: FilteredValuesType) => ({
    type: CHANGE_TODOLIST_FILTER,
    payload: {todolistID, newFilter}
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: SET_TODOLISTS, payload: {todolists}} as const)
//ThunkCreators
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
        throw new Error("Todolists weren't loaded")
    }
}
export const createTodolistTC = (newTitle: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.createTodolist(newTitle)
    if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item))
    }
}
export const deleteTodolistTC = (todolistID: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.deleteTodolist(todolistID)
    if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistID))
    }
}
export const updateTodolistTC = (todolistID: string, newTitle: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.updateTodolist(todolistID, newTitle)
    if (res.data.resultCode === 0) {
        dispatch(editTodolistAC(todolistID, newTitle))
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
//types for state
export type TodolistEntityType = TodolistType & {
    //value
    filter: FilteredValuesType
}
export type FilteredValuesType = "all" | "active" | "completed";