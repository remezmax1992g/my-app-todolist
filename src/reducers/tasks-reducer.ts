import {v1} from "uuid";
import {
    ADD_TODOLIST,
    AddTodolistACType,
    REMOVE_TODOLIST,
    RemoveTodolistACType,
} from "./todolists-reducer";
import {TaskPriority, TaskStatus, TaskType} from "../api/tasks-api";
//types for Action
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusCheckboxACType = ReturnType<typeof changeStatusCheckboxAC>
type EditTaskACType = ReturnType<typeof editTaskAC>
type ActionTaskType =
    RemoveTaskACType
    | RemoveTodolistACType
    | AddTaskACType
    | AddTodolistACType
    | ChangeStatusCheckboxACType
    | EditTaskACType
//types for state
export type TasksType = {
    [key: string]: Array<TaskType>
}
//constants
export const REMOVE_TASK = "REMOVE-TASK"
export const ADD_TASK = "ADD-TASK"
export const CHANGE_STATUS_CHECKBOX = "CHANGE-STATUS-CHECKBOX"
export const EDIT_TASK = "EDIT-TASK"
//initialState
const initialStateForTasks: TasksType = {}
//reducer
export const tasksReducer = (state: TasksType = initialStateForTasks, action: ActionTaskType): TasksType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.id)
            }
            case REMOVE_TODOLIST:
                let copyState = {...state}
                delete copyState[action.payload.todolistID]
            return copyState
        case ADD_TASK:
            return {
                ...state,
                [action.payload.todolistID]: [{
                    id: v1(),
                    title: action.payload.newTitle,
                    description: "No information",
                    status: TaskStatus.New,
                    priority: TaskPriority.Low,
                    startDate:"",
                    deadline: "",
                    todoListId: action.payload.todolistID,
                    order: 0
                }, ...state[action.payload.todolistID]]
            }
        case ADD_TODOLIST:
            return {
                ...state, [action.todolistID]: []
            }
        case CHANGE_STATUS_CHECKBOX:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                    ...t,
                    status: action.payload.status
                } : t)
            }
        case EDIT_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]?.map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        default:
            return state
    }
}
//ActionCreator
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
export const changeStatusCheckboxAC = (todolistID: string, id: string, status: TaskStatus) => {
    return {
        type: CHANGE_STATUS_CHECKBOX,
        payload: {todolistID, id, status}
    } as const
}
export const editTaskAC = (todolistID: string, id: string, newTitle: string) => {
    return {
        type: EDIT_TASK,
        payload: {todolistID, id, newTitle}
    } as const
}