import axios from "axios";

const setting ={
    withCredentials: true,
    headers:{
        "API-KEY": "8a3ca6c1-dfb0-48cf-8608-08d82687d761"
    }
}

export const todolistsAPI = {
    getTodolists(){
        return axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", setting)
    },
    createTodolist(title: string){
        return axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, setting)
    },
    deleteTodolist(todolistID: string){
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`,  setting)
    },
    updateTodolist(todolistID: string, updateTitle: string){
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {title: updateTitle}, setting)
    }
}