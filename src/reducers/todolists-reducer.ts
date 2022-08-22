import {FilteredValuesType, TodolistsType} from "../App";
import {v1} from "uuid";
//types
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type EditTodolistACType = ReturnType<typeof editTodolistAC>
type ChangeTodolistFilterType = ReturnType<typeof changeFilterTodolistAC>
type ActionTodolistType = RemoveTodolistACType | AddTodolistACType | EditTodolistACType | ChangeTodolistFilterType
//constants
export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const EDIT_TODOLIST_TITLE = "EDIT-TODOLIST-TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"
//initialSate
export let todolistID1 = v1();
export let todolistID2 = v1();
const initialStateForTodolists: Array<TodolistsType> = []
//reducer
export const todolistsReducer = (state: Array<TodolistsType> = initialStateForTodolists, action: ActionTodolistType): Array<TodolistsType> => {
    switch(action.type){
        case REMOVE_TODOLIST:
            return state.filter(td => td.id !== action.payload.todolistID)
        case ADD_TODOLIST:
            return [{id: action.todolistID, title: action.payload.newTitle, filter:"all"},...state]
        case EDIT_TODOLIST_TITLE:
            return state.map(td => td.id === action.payload.todolistID ? {...td, title: action.payload.newTitle}:td)
        case CHANGE_TODOLIST_FILTER:
            return state.map(td => td.id === action.payload.todolistID ? {...td, filter: action.payload.newFilter}: td)
        default:
            return state

    }
}
//ActionCreators
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {todolistID}
    } as const
}
export const addTodolistAC = (newTitle: string) => {
    return {
        type: ADD_TODOLIST,
        payload: {newTitle},
        todolistID: v1()
    } as const
}
export const editTodolistAC = (todolistID:string, newTitle: string) => {
    return {
        type: EDIT_TODOLIST_TITLE,
        payload: {todolistID, newTitle}
    } as const
}
export const changeFilterTodolistAC = (todolistID:string, newFilter: FilteredValuesType) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        payload: {todolistID, newFilter}
    } as const
}