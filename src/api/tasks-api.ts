import axios from "axios";
//setting
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "8a3ca6c1-dfb0-48cf-8608-08d82687d761"
    }
})
//requests
export const tasksAPI = {
    getTask(todolistID: string) {
        return instance.get<TasksType>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks`, {title: title})
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todolistID: string, taskID: string, model: UpdateTaskResponseModelType) {
        return instance.put(`todo-lists/${todolistID}/tasks/${taskID}`, model)
    }
}
//types
export type TasksType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
}
export type ResponseTaskType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number
}
export type UpdateTaskResponseModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}
//enums
export enum TaskStatus{
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3

}
export enum TaskPriority{
    Low = 0,
    Middle = 1,
    High= 2,
    Urgently = 3,
    Later= 4
}