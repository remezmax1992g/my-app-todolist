import {
    ADD_TODOLIST,
    AddTodolistACType,
    REMOVE_TODOLIST,
    RemoveTodolistACType,
    SET_TODOLISTS,
    SetTodolistsACType
} from "./todolists-reducer";
import {tasksAPI, TaskStatus, TaskType} from "../api/tasks-api";
import {AppRootState, AppThunk} from "../redux/redux";
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
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case ADD_TODOLIST:
            return {...state, [action.payload.todolist.id]: []}
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
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        case SET_TODOLISTS:
            const newState = {...state}
            action.payload.todolists.forEach(tl => {
                newState[tl.id] = []
            })
            return newState
        case SET_TASKS:
            return {...state, [action.payload.todolistID]: action.payload.tasks}
        default:
            return state
    }
}
//ActionCreators
export const removeTaskAC = (todolistID: string, id: string) =>
    ({type: REMOVE_TASK, payload: {todolistID, id}}as const)
export const addTaskAC = (task: TaskType) =>
    ({type: ADD_TASK, payload: {task}}as const)
export const changeStatusCheckboxAC = (todolistID: string, id: string, status: TaskStatus) =>
    ({type: CHANGE_STATUS_CHECKBOX, payload: {todolistID, id, status}}as const)
export const editTaskAC = (todolistID: string, id: string, newTitle: string) =>
    ({type: EDIT_TASK, payload: {todolistID, id, newTitle}}as const)
export const setTasksAC = (todolistID: string, tasks: TaskType[]) =>
    ({type: SET_TASKS, payload: {todolistID, tasks}}as const)
//ThunkCreators
export const fetchTaskTC = (todolistID: string): AppThunk => async dispatch => {
    const res = await tasksAPI.getTask(todolistID)
    dispatch(setTasksAC(todolistID, res.data.items))
}
export const createTaskTC = (todolistID: string, newTitle: string): AppThunk => async dispatch => {
    const res = await tasksAPI.createTask(todolistID, newTitle)
    if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item))
    }
}
export const deleteTaskTC = (todolistID: string, taskID: string): AppThunk => async dispatch => {
    const res = await tasksAPI.deleteTask(todolistID, taskID)
    if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(todolistID, taskID))
    }

}
export const updateTaskTC = (todolistID: string, taskID: string, newTitle: string): AppThunk => async (dispatch, getState: () => AppRootState) => {
    const findedTask = getState().tasks[todolistID].find(task => task.id === taskID)
    if(!findedTask){
        console.warn("Task wasn't found in the state")
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
    if(res.data.resultCode === 0){
        dispatch(editTaskAC(todolistID, taskID, newTitle))
    }
}
export const changeStatusTaskTC = (todolistID: string, taskID: string, status: TaskStatus): AppThunk => async (dispatch, getState: () => AppRootState) => {
    const findedTask = getState().tasks[todolistID].find(task => task.id === taskID)
    if(!findedTask){
        console.warn("Task wasn't found in the state")
        return
    }
    const res = await tasksAPI.updateTask(todolistID, taskID, {title: findedTask.title,
        description: findedTask.description,
        status: status,
        priority: findedTask.priority,
        startDate: findedTask.startDate,
        deadline: findedTask.deadline})
    if(res.data.resultCode === 0){
        dispatch(changeStatusCheckboxAC(todolistID, taskID, status))
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