import {TasksType} from "../App";
import {v1} from "uuid";
import {ADD_TODOLIST, AddTodolistACType} from "./todolists-reducer";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusCheckboxACType = ReturnType<typeof changeStatusCheckboxAC>
type EditTaskACType = ReturnType<typeof editTaskAC>

type ActionTaskType =
    RemoveTaskACType
    | AddTaskACType
    | AddTodolistACType
    | ChangeStatusCheckboxACType
    | EditTaskACType

export const REMOVE_TASK = "REMOVE-TASK"
export const ADD_TASK = "ADD-TASK"
export const CHANGE_STATUS_CHECKBOX = "CHANGE-STATUS-CHECKBOX"
export const EDIT_TASK = "EDIT-TASK"

export const tasksReducer = (state: TasksType, action: ActionTaskType) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.id)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.payload.todolistID]: [{
                    id: v1(),
                    title: action.payload.newTitle,
                    isDone: false
                }, ...state[action.payload.todolistID]]
            }
        case ADD_TODOLIST:
            return {
                ...state, [action.payload.todolistID]: []
            }
        case CHANGE_STATUS_CHECKBOX:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        case EDIT_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: REMOVE_TASK,
        payload: {todolistID, id}
    } as const
}
export const addTaskAC = (todolistID: string, newTitle: string) => {
    return {
        type: ADD_TASK,
        payload: {todolistID, newTitle}
    } as const
}
export const changeStatusCheckboxAC = (todolistID: string, id: string, isDone: boolean) => {
    return {
        type: CHANGE_STATUS_CHECKBOX,
        payload: {todolistID, id, isDone}
    } as const
}
export const editTaskAC = (todolistID: string, id: string, newTitle: string) => {
    return {
        type: EDIT_TASK,
        payload: {todolistID, id, newTitle}
    } as const
}