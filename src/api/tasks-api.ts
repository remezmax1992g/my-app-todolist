import axios from "axios";

const setting = {
    withCredentials: true,
    headers: {
        "API-KEY": "8a3ca6c1-dfb0-48cf-8608-08d82687d761"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...setting
})
export type TasksType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
}

type ResponseTaskType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number
}


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
    updateTask(todolistID: string, taskID: string, updateTitle: string) {
        return instance.put(`todo-lists/${todolistID}/tasks/${taskID}`, {title: updateTitle})
    }
}