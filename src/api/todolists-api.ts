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
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseTodolistType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodolistType }>>("todo-lists", {title: title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistID}`, setting)
    },
    updateTodolist(todolistID: string, updateTitle: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistID}`, {title: updateTitle})
    }
}