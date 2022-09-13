import {v1} from "uuid";
import {
    ADD_TODOLIST,
    AddTodolistACType,
    REMOVE_TODOLIST,
    RemoveTodolistACType,
    SET_TODOLISTS,
    SetTodolistsACType,
} from "./todolists-reducer";
import {TaskPriority, tasksAPI, TaskStatus, TaskType} from "../api/tasks-api";
import {AppThunk} from "../redux/redux";
//types for Action
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusCheckboxACType = ReturnType<typeof changeStatusCheckboxAC>
type EditTaskACType = ReturnType<typeof editTaskAC>
type SetTasksACType = ReturnType<typeof setTasksAC>
export type ActionTaskType =
    RemoveTaskACType
    | RemoveTodolistACType
    | AddTaskACType
    | AddTodolistACType
    | ChangeStatusCheckboxACType
    | EditTaskACType
    | SetTodolistsACType
    | SetTasksACType
//types for state
export type TasksType = {
    [key: string]: Array<TaskType>
}
//constants
export const REMOVE_TASK = "REMOVE-TASK"
export const ADD_TASK = "ADD-TASK"
export const CHANGE_STATUS_CHECKBOX = "CHANGE-STATUS-CHECKBOX"
export const EDIT_TASK = "EDIT-TASK"
export const SET_TASKS = "SET-TASKS"
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
                const copyState = {...state}
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
        case SET_TODOLISTS:
            const newState = {...state}
            action.payload.todolists.forEach(tl => {newState[tl.id]=[]})
            return newState
        case SET_TASKS:
            return {...state, [action.payload.todolistID]: action.payload.tasks}
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
export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) => {
    return {
        type: SET_TASKS,
        payload: {todolistID, tasks}
    } as const
}
//Thunks
export const fetchTaskTC = (todolistID: string): AppThunk => async dispatch => {
    const res = await tasksAPI.getTask(todolistID)
    dispatch(setTasksAC(todolistID, res.data.items))
}