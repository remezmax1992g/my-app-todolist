import axios from "axios";
//setting
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "8a3ca6c1-dfb0-48cf-8608-08d82687d761"
    }
})
//types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseTodolistType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
//requests
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistID}`, {title})
    }
}